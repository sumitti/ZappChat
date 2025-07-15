import { generateToken } from '../lib/utlis.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import cloudinary from '../lib/cloudinary.js';

export const signup = async(req, res) => {
    const { email, fullName, password } = req.body;
    try {
        if(!email || !fullName || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if(password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        const user = await User.findOne({email});
        if(user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        if(newUser){
            //generate jwt token
            generateToken(newUser._id, res);
            //save user to database
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePicture: newUser.profilePicture,
            });

        }else{
            return res.status(400).json({ message: "User creation failed" });
        }

    } catch (error) {
        console.error("Error in signup:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({ message: "Invalid Email" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({ message: "Wrong Password" });
        }

        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePicture: user.profilePicture,
        });

    } catch (error) {
        console.error("Error in login:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie('jwt', "", {maxAge: 0});
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error in logout:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateProfile = async(req, res) => {
    try {
        const {profilePicture} = req.body;
        const userId = req.user._id;
        if(!profilePicture) {
            return res.status(400).json({ message: "Profile picture is required" });
        }
        
        const uploadResponse = await cloudinary.uploader.upload(profilePicture); // Upload to Cloudinary
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePicture: uploadResponse.secure_url }, // Update profile picture URL
            { new: true } // Return the updated user
        );

        res.status(200).json(updatedUser)
    } catch (error) {
        console.error("Error in updateProfile:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const checkAuth = (req, res) => {
    try {
     res.status(200).json(req.user);
    } catch (error) {
        console.error("Error in checkAuth:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


