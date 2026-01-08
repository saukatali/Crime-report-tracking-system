import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hover = false,
  gradient = false,
  ...props 
}) => {
  return (
    <div
      className={`
        bg-white dark:bg-gray-800 
        rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300
        ${hover ? 'hover:shadow-md hover:-translate-y-1 cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
