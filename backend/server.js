import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import postRoutes from "./routes/post.route.js"
import notificationRoutes from "./routes/notification.route.js"
import connectionRoutes from "./routes/connection.route.js"
import cors from "cors"
import { connectDB } from "./lib/db.js";

dotenv.config();

const app=express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials:true,
})
);
// set the image size limit 5mb otherwise it says payload is too large
app.use(express.json({limit: "5mb"}));//parse JSON request bodies
app.use(cookieParser());//to get the token

//routes for authentication
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/connections", connectionRoutes);

app.listen(PORT, ()=>{
    console.log(`server running on the port ${PORT}`);
    connectDB();
})