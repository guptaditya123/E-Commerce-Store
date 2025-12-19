import { redis } from "../lib/redis.js";
import User from "../models/user.model.js";

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
    samesite: "strict", //prevent csrf attack, cross-site request forgery
    maxAge: 15 * 60 * 1000, // 15min
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true, // prevent XSS attack , cross-site scripting attack
    secure: process.env.NODE_ENV === "production",
    samesite: "strict", //prevent csrf attack, cross-site request forgery
    maxAge: 7 * 24 * 60 * 60 * 1000, // 15min
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

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const login = async (req, res) => {
  res.send("login route is called");
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
    await redis.delete(`refresh_token:,${decoded.userId}`);

    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    res.json({ message: "logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
