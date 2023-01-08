import mongoose, { Schema, model } from "mongoose";
const  foodItemSchema = new mongoose.Schema({
    title:String,
    description: String,
    imgUrl:String,
    price: Number,
    category:String
})

const foodItem = model("foodItem", foodItemSchema)

export default foodItem;