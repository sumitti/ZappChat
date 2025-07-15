import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import dotenv from 'dotenv';
dotenv.config();

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token) {
            return res.status(401).json({messsage: "Unauthorized access, please login first"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) {
            return res.status(401).json({message: "Invalid token, please login again"});
        }

        const user = await User.findById(decoded.userId).select("-password");// We don't want to send password in response that's why we use select("-password")    
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error in protectRoute middleware:", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}