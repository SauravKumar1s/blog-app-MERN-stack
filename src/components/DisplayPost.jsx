import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

const DisplayPost = () => {
    const [blog, setBlog] = useState({ title:"" , content:""});
    const [password, setPassword] = useState('');
  
    const handleChangeBlog = (e) => {
        const name = e.target.event;
        const value = e.target.event;
      setBlog({...blog , [name] : value})
    };
  
    
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(blog)
      // Handle form submission here
    };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex">
  <img
    src="https://via.placeholder.com/64x64"
    alt="Avatar"
    className="w-16 h-16 object-cover rounded-full mr-4"
  />
  <div className="flex-grow p-6">
    <div className="flex justify-between items-center mb-2">
      <h2 className="text-xl font-semibold text-gray-800">
        John Doe
      </h2>

      
      <div className="flex">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-l">
          Update
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-r">
          Delete
        </button>
      </div>
    </div>
    <img
          src="https://via.placeholder.com/600x400"
          alt="Blog Post Image"
          className="w-full h-48 object-cover"
        />

<p className="text-gray-700 mb-4 text-3xl" onChange={handleChangeBlog}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus
      
    </p>
    <p className="text-gray-700 mb-4" onChange={handleChangeBlog}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus
      
    </p>
    <a
      href="#"
      className="text-blue-500 font-semibold hover:text-blue-600"
    >
      Read More
    </a>
  </div>
</div>

  );
};

export default DisplayPost;
