import express from 'express';
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from './utils/db.js';
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js"
import JobRoute from "./routes/job.route.js"
import applicationRouter from "./routes/application.route.js"
import path from 'path';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "https://wannajob.onrender.com/",
  credentials: true,
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;
const dirname = path.resolve();

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", JobRoute);
app.use("/api/v1/application", applicationRouter);

app.use(express.static(path.join(dirname, "/frontend/dist")));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(dirname, "frontend", "dist", "index.html"));
})



app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
})