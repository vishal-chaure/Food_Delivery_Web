import mongoose from "mongoose";

export const connectDB = async () => {
     await mongoose.connect('mongodb+srv://vishal_chaure_:Vishal%4015@cluster0.elvb3.mongodb.net/food-del').then(()=>console.log("DB connected"));
}