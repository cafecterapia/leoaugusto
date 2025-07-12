"use client";

import React from "react";

interface LoadingProps {
  className?: string;
  text?: string;
}

const Loading: React.FC<LoadingProps> = ({ className = "", text }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-[200px] ${className}`}
    >
      <div className="animate-pulse mb-4">
        <div className="w-8 h-8 bg-gray-300 rounded-full animate-bounce"></div>
      </div>
      {text && <p className="text-gray-600 text-sm animate-pulse">{text}</p>}
    </div>
  );
};

export default Loading;
