import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: String,
    email : String,
    phone : String,
    password : String,
    role : String
}, { timestamps:true})

const User = mongoose.model("User" , userSchema)

export default User