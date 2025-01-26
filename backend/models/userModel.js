import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name:{
         type: String,
         require : true
    },
    email :{
        type: String,
        require: true,
        unique : true
    },
    phoneNo : {
        type: Number,
        require : true
    },
    profession: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
})

// create model 

 const User = mongoose.model("User", userSchema);

 export default User;


 