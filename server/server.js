import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database/db.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin:process.env.ORIGIN,
}));
app.use(express.json());


import complaintRouter from "./routes/complaint.route.js"
import constructorRouter  from "./routes/constructor.route.js";
import constructorProfile from "./routes/constructorprofile.route.js"

app.use("/api/complaint",complaintRouter);
app.use("/api/constructor",constructorRouter);

app.use("/api/constructorprofile",constructorProfile);





app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
