import jwt from "jsonwebtoken"
import User from '../models/user.model.js'
export const protectRoute = async(req,res,next)=>{
    try {
        const accessToken = req.cookies.accessToken;
        if(!accessToken){
            return res.status(401).json({message:"User not authenticated"})
        }

        const decoded = jwt.verify(accessToken,process.env.ACCESS_TOKEN_KEY);
        const user = await User.findById(decoded.id).select("-password");

        if(!user){
            return res.status(401).json({message:"User not found"});
        }

        req.user = user;
        next();


    } catch (error) {
        console.log("Error in protectedRoute middleware",error.message);
        return res.status(401).json({message:"Unauthorized - Invalid access Token"})
    }
}



// admin route
export const adminRoute = async(req,res,next)=>{
    try {
        if(req.user && req.user.role === "admin"){
            next();
        }else{
            return res.status(401).json({message:"Access denied - Admin only"})
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}