// import React from 'react';
// import  "../pages/Home.css"
// import logImage from '../pages/img/logo[1].png';

// const Header = () => {
//   return (
//     <div className="bg-white shadow-md px-20 py-2 flex items-center justify-between  sticky top-0
// ">
//       {/* Logo */}
//       <div className="flex items-center">
//         <img src={logImage} alt="Logo" className="h-15 w-auto" />
//       </div>

//       {/* Navigation Links */}
//       <ul className="flex items-center space-x-6">
//         <li className="text-orange-700 font-bold hover:underline cursor-pointer ">Home</li>
//         <li className="text-orange-700 font-bold hover:underline cursor-pointer">About</li>
//         <li className="text-orange-700 font-bold hover:underline cursor-pointer">Blog</li>
//         <li className="text-orange-700 font-bold hover:underline cursor-pointer">Contact</li>
//         <button className="ml-4 px-4 py-2 bg-orange-600 text-white rounded hover:bg-blue-700 transition">
//           Login
//         </button>
//       </ul>
//     </div>
//   );
// };

// export default Header;







import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; 
import logImage from '../pages/img/logo[1].png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4 flex items-center justify-between h-[70px]">
       
        {/* <div className="w-[50px]">
          <img src={Logo} alt="Logo" className="w-full" />
        </div> */}
        <div className="flex items-center">
         <img src={logImage} alt="Logo" className="h-15 w-auto" />
      </div>

     
        <nav className="hidden md:flex gap-10 text-lg font-medium items-center">
          <Link to="/" className="text-[#f27144] hover:underline">Home</Link>
          <Link to="/about" className="text-[#f27144] hover:underline">About</Link>
          <Link to="/blog" className="text-[#f27144] hover:underline">Blog</Link>
          <Link to="/contact" className="text-[#f27144] hover:underline">Contact Us</Link>
          <Link className="text-[#f27144]">
                <button className="border-3 border-black px-[13px] py-[7px] text-[20px] rounded-xl bg-[#f27144] text-white">
                  Login
                </button>
              </Link>
        </nav>

      
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

   
      {isOpen && (
        <div className="md:hidden px-6 pb-4 bg-white shadow-md">
          <nav className="flex flex-col gap-4 text-lg font-medium">
            <Link to="/" onClick={toggleMenu} className="text-[#f27144] hover:text-black">Home</Link>
            <Link to="/about" onClick={toggleMenu} className="text-[#f27144] hover:text-black">About</Link>
            <Link to="/blog" onClick={toggleMenu} className="text-[#f27144] hover:text-black">Blog</Link>
            <Link to="/contact" onClick={toggleMenu} className="text-[#f27144] hover:text-black">Contact Us</Link>
            <Link to="/login" onClick={toggleMenu}>
              <button className="bg-[#f27144] text-white w-full py-2 rounded-xl hover:bg-[#d85c32] transition-all">
                Login
              </button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;