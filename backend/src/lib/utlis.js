import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
// Function to generate JWT token
export const generateToken = (userId, res)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })
    // Send JWT TOKEN in cookie
    res.cookie('jwt', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, 
        httpOnly: true,// Prevents client-side JavaScript from accessing the cookie
        sameSite: 'strict', // Helps prevent Caross-Site Request Forgery (CSRF) attacks
        secure: process.env.NODE_ENV !== 'development' // Ensures the cookie is sent over HTTPS in production
    })

    return token;
}