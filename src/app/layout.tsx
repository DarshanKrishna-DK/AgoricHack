// app/layout.tsx
import React from 'react';
import Navbar from './Navbar';
import Footer from './footer';
import './globals.css'; // Import global styles if you have any

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        {/* Link to Google Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-['Raleway', sans-serif] bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;