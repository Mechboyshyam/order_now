import mongoose from "mongoose";
import dotenv, { config } from 'dotenv'
import express from "express";
dotenv.config();
import User from "./models/user.js";
import foodItem from "./models/foodItem.js";
import Table from "./models/table.js";
import Order from "./models/order.js";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;
mongoose.set("strictQuery", false);
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

app.get("/allFoodItems", async(req,res)=>{
    const foodItem = await foodItem.find()

    res.json({
        success:true,
        message:'food item fetched succesfully',
        data: foodItem
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

app.post("/createTable", async(req,res)=>{
    const {tableNumber, occupied} = req.body;

    const table = new Table({
        tableNumber: tableNumber,
        occupied: false
    })

    const savedTable = await table.save();

    res.json({
        success:true,
        message: "Table created successfully",
        data: savedTable
    })

    const existingTable  = await Table.findOne({ tableNumber:tableNumber});
        if (existingTable){
            return res.json({
                success:false,
                message: "Table already exists"
            })
        }

})

app.post("/bookTable", async(req,res)=>{
    const {tableNumber, userId} = req.body;

    const existingTable = await Table.findOne({tableNumber:tableNumber});
    if (existingTable && existingTable.occupied) {
        return res.json({
            success:false,
            message: "Table already occupied"
        })
    }

    if (existingTable){
        existingTable.occupied = true;
        existingTable.occupiedBy = userId;
        await existingTable.save();
    }

    res.json({
        success:true,
        message: "Table booked successfully",
        data: existingTable
    })
})

app.post("/unbookTable", async(req,res)=>{
    const {tableNumber} = req.body;
    
    const existingTable = await Table.findOne({tableNumber:tableNumber});

    if (existingTable){
        existingTable.occupied = false;
        existingTable.occupiedBy = null;
        await existingTable.save();
    }
    res.json({
        success:true,
        message:"Table unbooked successfully",
        data: existingTable
    })
})

app.get("/availableTables", async(req,res)=>{
    const availableTables = await Table.find({ occupied: false});

    res.json({
        success:true,
        message:"Available tables fetched successfully",
        data: availableTables
    })
})

app.post("/orderfoodItems", async(req,res)=>{
    const {userId, tableNumber, items } = req.body;

    const totalOrders = await Order.countDocuments();
    const orderId = totalOrders + 1;

    const order = new Order({
        orderId:orderId,
        userId:userId,
        tableNumber:tableNumber,
        items:items
    })

    const saveOrder = await order.save();

    res.json({
        success:true,
        message: "Order placed successfully",
        data: saveOrder
    })

})

app.get("/order", async(req , res)=>{
    const {orderId} = req.query;

const order = await Order.findOne({orderId:orderId});

res.json({
    success:true,
    message: "Order fetched successfully",
    data: order
  })

})

app.get("/ordersByUserId", async(req,res)=>{
    const {userId} = req.query;

    const orders = await Order.find({userId:userId});

    res.json({
        success:true,
        message:"Orders fetched successfully",
        data: orders
    })
})
// API ends here

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})