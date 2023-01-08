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

    const emptyFields = [];

    if (!name) emptyFields.push('Name');
    if (!phone) emptyFields.push('Phone');
    if (!email) emptyFields.push('Email');
    if (!password) emptyFields.push('Password');
    if (!role) emptyFields.push('Role');

    // validation to check all fields are here

    // validation to check if email already exist 
        const existingUser = await User.findOne({email:email});
        if (existingUser){
            return res.json({
                success: false,
                massage: "Email already exist"
            })
        }

    // validation to check if phone already exist
    const existingUserPhone = await User.findOne({phone:phone});
    if (existingUserPhone){
        return res.json({
            success: false, 
            massage : "Phone already exist"
        })
    } 

    // validation to check if name already exist
    const existingUserName = await User.findOne({name : name});
    if (existingUserName){
        return res.json({
            success: false, 
            massage : "Name already exist"
        })
    } 

    

    if (emptyFields.length > 0 ) {
        return res.json({
            success: false,
            massage : `Required to fill - ${emptyFields.join(' , ')}`
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