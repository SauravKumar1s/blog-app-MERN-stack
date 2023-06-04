import React, { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

const Navbar = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigator = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("http://localhost:4000/api/user/auth", {
        method: "GET",
        headers: { token: localStorage.getItem("token") },
      });
      const data = await res.json();
      if (res.ok) {
        setAuth(data);
      } else {
        return; 
      }
    };
    fetchUser();
  }, [auth]);

  return (
    <nav className="bg-gray-800 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <a href="#" className="text-white text-2xl font-bold">
              My Website
            </a>
          </div>
          <div className="hidden md:block">
            <ul className="ml-4 flex items-center space-x-4">
              {auth ? (
                <>
                  <li>
                    <NavLink
                      to="/"
                      className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/create"
                      className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Create Post
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="/login"
                      className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/register"
                      className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

  

export default Navbar;
