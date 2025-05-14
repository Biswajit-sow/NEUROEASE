import React from 'react';

function Button({ children, onClick, className = '', variant = 'primary', ...props }) {
  const baseStyle = "px-6 py-3 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50";
  const variants = {
    primary: "bg-gradient-to-r bg-blue-500 via-purple-500 to-pink-500 text-white hover:from-blue-600 hover:to-pink-600",    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  return (
    <button
    
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
