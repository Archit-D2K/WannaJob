import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

// Initialize express app
const app = express();

// Load environment variables
dotenv.config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS options for allowing frontend access and credentials (cookies)
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true // Allow cookies and credentials
};
app.use(cors(corsOptions));

// Routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/company', companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Server port
const PORT = process.env.PORT || 3000;

// Start server and connect to the database
app.listen(PORT, async () => {
    await connectDB(); 
    
    // Ensure DB connection before listening
    console.log(`Server running at port ${PORT}`);
});
