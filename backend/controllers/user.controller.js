import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
dotenv.config({});

export const register =async(req,res)=>{
    try{
        const {fullName, email, phoneNumber, password, role}=req.body;
        console.log(fullName, email, phoneNumber, password, role)
        if(!fullName || !email || !phoneNumber || !password || !role){
           
            return res.status(400).json({
                message:"Something is missing",
                success:false
            });
        };
        const file = req.file;
        console.log("File received:", file); 
        if (!file) {
            return res.status(400).json({
                message: "Profile picture is required",
                success: false,
            });
        }
        // cloudinary 
        const fileUri=getDataUri(file);
        const cloudResponse=await cloudinary.uploader.upload(fileUri.content); 
        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:"user already exist with this email",
                success:false,
            });
        }
        const hashedPassword=await bcrypt.hash(password,10);
        await User.create({
            fullName,
            email,
            phoneNumber,
            password:hashedPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url,
            },
        });
        return res.status(201).json({
            message:"Account created successfully",
            success:true,
            "user": {
                "profileImage": "/path/to/image.jpg"
              }
        });
    }
   
    catch(error){
        console.error("Error in register:", error);  // Improved error logging
        return res.status(500).json({
            message: "Server error, please try again later.",
            success: false,
        });
    }
}
export const login=async(req,res)=>{
    try{
        const {email,password,role}=req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            });
        };
        let user=await User.findOne({email});
        if(!user){
            res.status(400).json({
                message:"Incorrect password",
                success:false,
            })
        }
        const isPasswordMatch= await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message:"incorrect email or password",
                success:false
            })
        };
        //chk role is correct??
        if(role!=user.role){
            return res.status(400).json({
                message:"Account doesn't exist with current role",
                success:false
            })
        };
        const tokenData={
            userId:user._id
        }
        const token =await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'});
        const userProfile = {
            bio: user.profile?.bio || null,
            skills: user.profile?.skills?.length > 0 ? user.profile.skills : [],
            resume: user.profile?.resume || null, // URL to the resume file
            resumeOriginalName: user.profile?.resumeOriginalName || null,
            profilePhoto: user.profile?.profilePhoto || null,
          
        };
        user={
            id:user._id,
            fullName:user.fullName,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile: userProfile,
        }
        console.log(user);

        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000, httpsOnly:true, sameSite:'strict'}).json({
            message:`welcome back ${user.fullName}`,
            user,
            success:true
        })
        
    }
    catch(error){
        console.log(error);
    }
}
export const logout=async(req,res)=>{
    try{
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message:"logout successfully",
            success:true,
        })

    }
    catch(error){
        console.log(error);
    }

}
export const updateUser = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, bio } = req.body;
        let skillsArray = [];

        // Parse skills if provided
        if (req.body.skills) {
            try {
                skillsArray = JSON.parse(req.body.skills); // Parse JSON array string into array
            } catch (error) {
                return res.status(400).json({ message: "Invalid skills data." });
            }
        }

        const file = req.file;
        let cloudResponse;

        // Cloudinary upload if file exists
        if (file) {
            const fileUri = getDataUri(file);
            try {
                cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            } catch (uploadError) {
                return res.status(500).json({ message: "Error uploading file to Cloudinary." });
            }
        }

        const userId = req.id; // Get user ID from authentication middleware
        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false
            });
        }

        // Ensure the profile object exists
        if (!user.profile) {
            user.profile = {}; // If profile does not exist, create an empty profile object
        }

        // Update user profile fields selectively
        if (fullName) user.fullName = fullName;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio; // Update bio only if provided
        if (skillsArray.length > 0) {
            user.profile.skills = skillsArray; // Update skills only if provided
        }

        // Handle resume file upload
        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url; // Save Cloudinary URL
            user.profile.resumeOriginalName = file.originalname; // Save original file name
        } else {
            // If no new file is uploaded, keep the existing resume URL
            user.profile.resume = user.profile.resume || user.profile.resume;
        }

        // Handle profile picture upload (if provided)
        if (cloudResponse) {
            user.profile.profilePhoto = cloudResponse.secure_url; // Save profile photo URL
        } else {
            // If no profile photo is uploaded, retain the existing profile photo
            user.profile.profilePhoto = user.profile.profilePhoto || user.profile.profilePhoto;
        }

        // Log the updated user object for debugging
        console.log("Updated User Object:", user);

        // Save the updated user profile
        await user.save();

        // Return the updated user profile
        return res.status(200).json({
            message: "Profile updated successfully.",
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profile: user.profile
            },
            success: true
        });

    } catch (error) {
        console.error("Error during profile update:", error);
        return res.status(500).json({
            message: "An error occurred during profile update.",
            success: false
        });
    }
};
