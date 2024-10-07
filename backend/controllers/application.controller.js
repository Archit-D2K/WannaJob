import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            })
        };
        
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }
        const newApplication = await Application.create({
            job:jobId,
            applicant:userId,
        });

        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message:"Job applied successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getAppliedJobs = async (req, res) => {
    try {
        const applications = await Application.find({
            applicant: req.id
        }).populate({
            path: "job",
            options: {
                sort: { createdAt: -1 }
            }
        }).populate({
            path: "job.applications",
            options: {
                sort: { createdAt: -1 }
            }
        });
        if (!applications) {
            return res.status(404).json({
                message: "Applications not found",
                success: false
            })
        }
        return res.status(200).json({
            applications,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getApplicants = async (req, res) => {
    try {
        const applications = await Application.find({
            job: req.params.id
        }).populate({
            path: "applicant",
            options: {
                sort: { createdAt: -1 }
            }
        });
        if (!applications) {
            return res.status(404).json({
                message: "Applications not found",
                success: false
            })
        }
        return res.status(200).json({
            applications,
            success: true
        })
    } catch (error) {   
        console.log(error);
    }
}

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const application = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!application) {
            return res.status(404).json({
                message: "Application not found",
                success: false
            })
        }
        return res.status(200).json({
            application,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}