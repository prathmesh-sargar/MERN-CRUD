import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import router from './routes/userRoute.js';
const app = express();
const PORT = process.env.PORT || 3000;

// middleware API's 
app.use(cors());
app.use(express.json());

// Database Is Connected Here 
// mongodb+srv://prathmeshtech27:prathmeshtech27@cluster0.jsvdd.mongodb.net/
mongoose.connect("mongodb+srv://prathmeshtech27:4EbxsXoHCVFew7u0@cluster0.m7qx2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
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
