import mongoose from "mongoose";
import dotenv, { config } from 'dotenv'
import express from "express";
dotenv.config();


const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URL , ()=>{
    console.log('Connected to MongoDB');
})

// API starts here

// API ends here

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})