import logger from "../lib/logger.js";
import redis  from "../lib/redis.js";
import User from "../models/user.model.js";
import { sendWelcomeEmail } from "../lib/email.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ id }, process.env.REFRESH_TOKEN_KEY, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};

const storeRefreshToken = async (id, refreshToken) => {
  await redis.set(`refresh_token:${id}`, refreshToken, "EX", 7 * 24 * 60 * 60);
};

const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true, // prevent XSS attack , cross-site scripting attack
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", //prevent csrf attack, cross-site request forgery
    maxAge: 15 * 60 * 1000, // 15min
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true, // prevent XSS attack , cross-site scripting attack
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", //prevent csrf attack, cross-site request forgery
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
  });
};

export const signup = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({ name, email, password });

    //authenticate
    const { accessToken, refreshToken } = generateToken(user._id);
    await storeRefreshToken(user._id, refreshToken);

    setCookies(res, accessToken, refreshToken);

    // Send welcome email (non-blocking)
    sendWelcomeEmail(email, name).catch(err => {
      logger.error('Failed to send welcome email', { email, error: err.message });
    });
    
    logger.info('User signed up successfully', { userId: user._id, email });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    logger.error('Signup error', { error: error.message, stack: error.stack });
    res.status(500).json(error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    logger.info(`Login attempt for email: ${email}`);
    const user = await User.findOne({ email });
    if (user && (await user.comparePassword(password))) {
      const { accessToken, refreshToken } = generateToken(user._id);
      await storeRefreshToken(user._id, refreshToken);
      setCookies(res, accessToken, refreshToken);
      logger.info(`User logged in: ${user.name}, id: ${user._id}, email: ${user.email}`);
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      logger.warn(`Failed login attempt for email: ${email}`);
      res.status(401).json("Invalid email or password");
    }
  } catch (err) {
    logger.error(`Error logging in: ${err}`);
    res.status(500).json({ message: `Internal server error,${err}` });
  }
};

export const logout = async (req, res) => {
  try {
    console.log("logging out");
    const refreshToken = req.cookies.refreshToken;
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
    console.log(decoded);
    await redis.del(`refresh_token:${decoded.id}`);

    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    res.json({ message: "logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// this is to refresh the access token
export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
    const storedToken = await redis.get(`refresh_token:${decoded.id}`);

    if (storedToken !== refreshToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const accessToken = jwt.sign(
      { id: decoded.id },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: "15m" }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    return res.json({ message: "Token Refreshed Successfully." });
  } catch (err) {
    console.log("Error in refreshToken:", err.message);
    return res.status(401).json({ message: "Invalid refresh token" });
  }
};


export const getProfile = async (req, res) => {
  try {
    res.json(req.user);
  }
  catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllUsers=async(req,res)=>{
  try {
    console.log(req.user);
   if(req.user.role !== 'admin'){
    return res.status(400).json({message:"only admin are allowed."});
    }

    const allUsers = await User.find().select('name email _id cartItems');
    return res.status(200).json(allUsers);


  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });

  }
}