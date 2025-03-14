import React from "react";
import QueryCard from "./QueryCard";
import OwnerQueries from "./QueryAndRespond";

const OwnerDashboard = () => {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/assets/pet clinic Backgraund.jpg')" }}
    >
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-6">
          Owner Dashboard
        </h2>
        {/* Flexbox for Two Columns */}
        <div className="flex flex-wrap gap-6">
          {/* Left Column: OwnerQueries */}
          <div className="flex-1 min-w-[300px]">
            <OwnerQueries />
          </div>
          {/* Right Column: QueryCard */}
          <div className="flex-1 min-w-[300px]">
            <QueryCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
