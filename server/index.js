import mongoose from "mongoose";
import dotenv, { config } from 'dotenv'
import express from "express";
dotenv.config();
import User from "./models/user.js";
import foodItem from "./models/foodItem.js";


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

app.post('/login', async(req,res)=>{
    const {email, password} = req.body;

    if (!email || !password) {
        return res.json({
            success:false,
            message: "Email and password are required"
    })
    }

    const existingUser = await User.findOne({email:email , password:password});
        if (existingUser) {
            return res.json({
                success:true,
                message: "Login successful.",
                data : existingUser
            })
        }

        else {
            return res.json({
                success:false,
                message: "Email or Password invalid"
            })
        }
})

app.post('/foodItem' , async(req, res)=>{
    const {title, description, imgUrl, price, category} = req.body;

    const foodItem  = new foodItem({
        title:title,
        description:description,
        imgUrl:imgUrl,
        price:price,
        category:category
    })

    const savedfoodItem = await foodItem.save();
    res.json({
        success:true,
        message: "Food item saved successfully...",
        data : savedfoodItem
    })
})

app.get("/foodItemByCategory", async(req,res)=>{
    const {category} = req.query;

    const foodItem = await foodItem.find({
        category:{$regex: category, $options:'i'}
    })

    res.json({
        success:true,
        message:"Food item fetched successfully..",
        data: foodItem
    })
})

app.get('/foodItemsByTitle', async(req,res)=>{
    const {title} = req.query;

    const foodItem = await foodItem.find({
        title: {$regex: title, $options:'i'}
    })

    res.json({
        success:true,
        message: "Food item fetched successfully",
        data: foodItem
    })
})



// API ends here

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})