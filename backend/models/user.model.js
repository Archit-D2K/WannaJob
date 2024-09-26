import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['student', 'recruiter']},
    phoneNumber: { type: Number, required: true },
    profile:{
        bio: { type: String },
        skills: [{ type: String }],
        resume: { type: String },
        resumeoriginalname: { type: String },
        company:{type:mongoose.Schema.Types.ObjectId, ref: 'Company'},
        profilephoto:{type:String,
            default:""
        }
    }


}
,{
    timestamps: true
});
export const User = mongoose.model('User', userSchema);

