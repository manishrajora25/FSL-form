import React from 'react';
import  "../pages/Home.css"
import logImage from '../pages/img/logo[1].png';

const Header = () => {
  return (
    <div className="bg-white shadow-md px-20 py-2 flex items-center justify-between  sticky top-0
">
      {/* Logo */}
      <div className="flex items-center">
        <img src={logImage} alt="Logo" className="h-15 w-auto" />
      </div>

      {/* Navigation Links */}
      <ul className="flex items-center space-x-6">
        <li className="text-orange-700 font-bold hover:underline cursor-pointer ">Home</li>
        <li className="text-orange-700 font-bold hover:underline cursor-pointer">About</li>
        <li className="text-orange-700 font-bold hover:underline cursor-pointer">Blog</li>
        <li className="text-orange-700 font-bold hover:underline cursor-pointer">Contact</li>
        <button className="ml-4 px-4 py-2 bg-orange-600 text-white rounded hover:bg-blue-700 transition">
          Login
        </button>
      </ul>
    </div>
  );
};

export default Header;
