
import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try{

  
    const { fullname, email, password, role, phoneNumber } = req.body;
    if (!fullname || !email || !password || !role || !phoneNumber) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
        fullname,
        email,
        password: hashedPassword,
        role,
        phoneNumber,
      
    });
    res.status(201).json({ message: "User created successfully" });
} catch (error) {
    
    res.status(500).json({ message: "Internal server error" });
}
}


export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Check if all fields are present
        if (!email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Check if the role matches
        if (role !== user.role) {
            return res.status(400).json({ message: "Invalid role credentials" });
        }

        // Generate token
        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });

        // Prepare user data without overwriting `user` variable
        const userData = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            role: user.role,
            phoneNumber: user.phoneNumber,
            profile: user.profile,
        };

        // Send response with token and user data
        return res
            .status(200)
            .cookie("token", token, { 
                maxAge: 1 * 24 * 60 * 60 * 1000, 
                httpOnly: true, // Correct option
                sameSite: 'strict' 
            })
            .json({
                message: `Welcome back ${userData.fullname}`,
                user: userData,
                success: true
            });

    } catch (error) {
        console.error(error);  // Log error for debugging
        return res.status(500).json({ message: "Internal server error" });
    }
};
export const logout = async (req, res) => {
    try{
        res.clearCookie("token");
        res.status(200).json({ message: "Logout successful" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        



        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }
        const userId = req.id; // middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }
        // updating data
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber)  user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray
        


        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}