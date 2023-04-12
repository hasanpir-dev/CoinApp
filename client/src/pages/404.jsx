import React from "react";
import { useNavigate } from "react-router-dom";
function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-violet-700">404</h1>
      <p className="text-2xl font-medium mt-6 mb-8">Page not found</p>
      <button
        onClick={() => navigate(-1)}
        className="bg-violet-700 hover:bg-violet-500 transition-all text-white py-3 px-6 rounded-lg"
      >
        Go Back
      </button>
    </div>
  );
}

export default NotFoundPage;
