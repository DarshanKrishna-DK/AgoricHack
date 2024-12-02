"use client";

// components/Navbar.tsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Import Link from Next.js
import "./globals.css";

const Navbar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-center">
          ZaPP
        </div>
        <div className="flex items-center space-x-8">
          <a 
            href="#" 
            onClick={() => handleScrollTo('home')} 
            className="hover:text-blue-500 transition-colors duration-300"
          >
            Home
          </a>
          <a 
            href="#" 
            onClick={() => handleScrollTo('about')} 
            className="hover:text-blue-500 transition-colors duration-300"
          >
            About Us
          </a>
          <a 
            href="#" 
            onClick={() => handleScrollTo('services')} 
            className="hover:text-blue-500 transition-colors duration-300"
          >
            Services
          </a>
          <a 
            href="#" 
            onClick={() => handleScrollTo('contact')} 
            className="hover:text-blue-500 transition-colors duration-300"
          >
            Contact Us
          </a>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                className="hidden"
                checked={isDarkMode}
                onChange={toggleDarkMode}
              />
              <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
              <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${isDarkMode ? 'transform translate-x-full bg-blue-500' : ''}`}></div>
            </div>
          </label>
          <Link href="/homepage" className="hover:text-blue-500 transition-colors duration-300">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;