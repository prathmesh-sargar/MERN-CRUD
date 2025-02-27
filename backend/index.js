import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import router from './routes/userRoute.js';
import dotenv from 'dotenv'
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// middleware API's 
app.use(cors());
app.use(express.json());

// Database Is Connected Here 
// mongodb+srv://prathmeshtech27:prathmeshtech27@cluster0.jsvdd.mongodb.net/
mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("DB is connected");

}).catch((error)=>{
    console.log(error);
})

// API End points 
app.use("/api",router)

app.listen(PORT,()=>{
     console.log(`server is running on port ${PORT}`);
})
