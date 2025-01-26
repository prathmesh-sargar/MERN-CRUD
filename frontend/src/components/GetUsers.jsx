import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast  from "react-hot-toast";

const GetUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user data from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://mern-crud-backend-fbyg.onrender.com/api/getall");
        if (response.status === 200) {
          setUsers(response.data.user || []);
          setLoading(false);
        } else {
          toast.error("Failed to fetch users.");
          setLoading(false);
        }
      } catch (error) {
        toast.error("An error occurred while fetching users.");
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);


  // Handle delete functionality
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await axios.delete(`https://mern-crud-backend-fbyg.onrender.com/api/delete/${id}`);
        if (response.status === 201) {
          toast.success("User deleted successfully!");
          setUsers(users.filter((user) => user._id !== id)); // Update state after deletion
        } else {
          toast.error("Failed to delete user.");
        }
      } catch (error) {
        toast.error("An error occurred while deleting the user.");
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">User Data</h1>
        <button className="bg-purple-500 rounded-lg px-4 m-2 text-white font-bold shadow-lg">
          <Link to={"/add"}>Add User</Link>
        </button>
        {loading ? (
          <p className="text-gray-600 text-lg">Loading users...</p>
        ) : (
          <div className="overflow-x-auto w-full max-w-4xl">
            <table className="table-auto w-full border-collapse bg-white shadow-lg rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Phone No</th>
                  <th className="py-3 px-6 text-left">Profession</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {user.name}
                    </td>
                    <td className="py-3 px-6 text-left">{user.email}</td>
                    <td className="py-3 px-6 text-left">{user.phoneNo}</td>
                    <td className="py-3 px-6 text-left">{user.profession}</td>
                    <td className="py-3 px-6 text-center flex justify-center items-center gap-4">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded flex items-center"
                      >
                        <span className="material-icons">
                          <Link to={`/update/${user._id}`}>edit</Link>
                        </span>
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded flex items-center"
                        onClick={() => handleDelete(user._id)}
                      >
                        <span className="material-icons">delete</span>
                       
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default GetUsers;
