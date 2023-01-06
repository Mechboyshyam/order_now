import mongoose from "mongoose";
import dotenv, { config } from 'dotenv'
import express from "express";
dotenv.config();
import User from "./models/user.js";


const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URL , ()=>{
    console.log('Connected to MongoDB');
})

// API starts here
app.post('/signup', async(req,res)=>{
    const {name, email, phone, password, role} = req.body;

if(!name || !email || !phone || !password || !role){
    return res.json({
        success:false,
        message: "All fields are required."
    })
}

    const user = new User({
        name : name, 
        phone : phone,
        email: email,
        password : password,
        role : role
    })

    const savedUser =await user.save();

    res.json({
        success: true,
        message : "User created successfully.",
        data: savedUser

    })
})
// API ends here

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})