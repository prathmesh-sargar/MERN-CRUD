import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast  from "react-hot-toast";

const AddUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:8000/api/create", data);

      if (response.status === 201) {
        toast.success(response.data.message || "User added successfully!");
        reset(); // Reset the form on success
        navigate("/");
      } else {
        toast.error(response.data.message || "Failed to add user.");
      }
    } catch (error) {
      if (error.response) {
        // Handle specific errors from the backend
        toast.error(error.response.data.message || "Error: Unable to add user.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <button className="md:mr-[1200px] bg-purple-400 px-3 rounded-lg font-bold shadow-lg text-white">
          <Link to={"/"}>Back</Link>
        </button>
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
          Add New User
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md"
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring"
          >
            Add User
          </button>
        </form>
      </div>
    </>
  );
};

export default AddUser;
