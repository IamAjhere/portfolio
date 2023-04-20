// components/LoadingSpinner.tsx
import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="w-full h-full fixed top-0 left-0 bg-black  flex items-center justify-center z-50">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-white"></div>
    </div>
  );
};

export default LoadingSpinner;
