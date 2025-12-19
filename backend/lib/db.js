import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectDB = async () =>{
    try{
       const conn = await mongoose.connect(process.env.MONGO_URI)
       console.log(`Mongodb connect ${conn.connection.host}`)
    }catch(err){
        console.log("Error connecting to mongodb",err.message);
        process.exit(1);
    }
}