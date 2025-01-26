import User from '../models/userModel.js';

export const create = async (req, res) => {
  try {
    // Log the incoming request body
    // console.log(req.body);

    // Destructure data from req.body
    const { name, email, phoneNo, profession } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !phoneNo || !profession) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email.",
        success: false,
      });
    }

    // Create a new user
    const newUser = await User.create({
      name,
      email,
      phoneNo,
      profession,
    });

    // Respond with success
    return res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });

  } catch (error) {
    // Handle any errors
    return res.status(500).json({
      message: "An error occurred while creating the user",
      error: error.message,
    });
  }
};


export const getAll = async(req,res)=>{

    try {

        const userdata = await User.find();
        // console.log(userdata);
        if(!userdata){
            return res.status(404).json({
                message: "Users not found",
                success : true
            })
        }

        return res.status(200).json({
            msg: "User list \n ",
            user: userdata
        })
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while getting users",
            error: error.message,
          });
    }
}


export const getuser = async(req,res)=>{

    try {
        const id = req.params.id;
        console.log("backend ID get  : ",id);
        
        const user = await User.findById(id);
        console.log("user get  : ",user);
        if(!user){
            return  res.status(404).json({
                msg: "User not found",
                success : false
            })  
        }
        return res.status(200).json({
            user:user
        })
  
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while getting user",
            error: error.message,
          });
    }
}


export const updateuser = async(req,res)=>{

    try {
        const {name,email,phoneNo,profession} = req.body;

        const id = req.params.id;
        const user = await User.findById(id);

        if(!user){
            res.status(404).json({
                smg:"Users not find.....",
                success: false
            })
        }

        // Update the user with new data
    const updatedUser = await User.findByIdAndUpdate(
        id,
        { name, email, phoneNo, profession }, // Data to update
        { new: true} // Options: return the updated user and validate input
      );

    return res.status(200).json({
        smg: "user updated successfully",
        user: updatedUser
    });

    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while updating user",
            error: error.message,
          });
    }
}


export const deleteuser = async(req,res)=>{
  
  try {

    const id = req.params.id;
    
    const user = await User.findByIdAndDelete(id);

    res.status(201).json({
      msg: "User deleted Successfully....\n ",
      user: user,
      success : true
    })
    
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while deleting  user",
      error: error.message,
    });
  }

}