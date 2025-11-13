import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
         await mongoose.connect(process.env.MONGO_URI)
         console.log("sucessfully connect to db")
    } catch (error) {
        console.log(error)
        process.exit(1)
        
    }
}

export default connectDB