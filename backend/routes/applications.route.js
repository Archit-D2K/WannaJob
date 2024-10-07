
import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { updateStatus , getApplicants,getAppliedJobs,applyJob } from "../controllers/application.controller.js";

const router = express.Router();

router.route("/apply/:id").post(isAuthenticated,applyJob);
router.route("/status/:id/update").put(isAuthenticated,updateStatus);
router.route("/:id/applicants").get(isAuthenticated,getApplicants);
router.route("/get").get(isAuthenticated,getAppliedJobs);

export default router