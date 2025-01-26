import axios from "axios";
import  { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {

  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,

  } = useForm({
    defaultValues : {},
  });

  // const {id}  = useParams();
  const id = useParams().id;
  console.log(id);
  
 useEffect(()=>{
  console.log("Use Params ID ",id);
  if(id){
    axios.get(`https://mern-crud-backend-fbyg.onrender.com/api/getuser/${id}`)
  .then((Response)=>{
    setUser(Response.data.user);
    reset(Response.data.user);
  })
  .catch((error)=>{
      console.log(error);  
  })
  }

 },[id,reset]) 
 
  const onSubmit = async(data) => {
    console.log("Updated User Data:", data);
    try {
          const res =  await axios.put(`http://localhost:8000/api/update/${id}`,data)
          toast.success(res.data.smg || "User updated successfully!");
          navigate("/");
    } catch (error) {
       console.log(error);  
    }
  };  return (

   <>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Update User</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        {/* Name Field */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-bold mb-2"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "Name is required" })}
            defaultValue={user.name}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-bold mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            defaultValue={user.email}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone Number Field */}
        <div className="mb-4">
          <label
            htmlFor="phoneNo"
            className="block text-gray-700 font-bold mb-2"
          >
            Phone Number
          </label>
          <input
            id="phoneNo"
            type="text"
            {...register("phoneNo", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Phone number must be 10 digits",
              },
            })}
            defaultValue={user.phoneNo}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring ${
              errors.phoneNo ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.phoneNo && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phoneNo.message}
            </p>
          )}
        </div>

        {/* Profession Field */}
        <div className="mb-4">
          <label
            htmlFor="profession"
            className="block text-gray-700 font-bold mb-2"
          >
            Profession
          </label>
          <input
            id="profession"
            type="text"
            {...register("profession", { required: "Profession is required" })}
            defaultValue={user.profession}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring ${
              errors.profession ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.profession && (
            <p className="text-red-500 text-sm mt-1">
              {errors.profession.message}
            </p>
          )}
        </div>

        {/* Update Button */}
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring"
        >
          Update
        </button>
      </form>
    </div>
   </>
  );
};

export default UpdateUser;
