import React from 'react';

const LoadingSpinner = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-4',
    lg: 'w-12 h-12 border-4',
  };
  return (
    <div className={`animate-spin rounded-full ${sizes[size]} border-t-blue-500 border-r-blue-500 border-b-blue-200 border-l-blue-200`}></div>
  );
};

export default LoadingSpinner;