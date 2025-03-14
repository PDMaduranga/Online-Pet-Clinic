import React, { useState, useEffect } from "react";
import { getAvailableClinics, makeAQuary } from "../../../apis/api";

const QueryCard = () => {
  const [clinics, setClinics] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [queryTitle, setQueryTitle] = useState("");
  const [queryDescription, setQueryDescription] = useState("");

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const clinicsData = await getAvailableClinics(); // Removed redundant .data
        setClinics(clinicsData);
      } catch (error) {
        console.error("Error fetching clinics:", error.message);
      }
    };

    fetchClinics();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedOption || !queryTitle || !queryDescription) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await makeAQuary({
        title: queryTitle,
        description: queryDescription,
        clinicId: selectedOption,
      });
      alert("Query submitted successfully!");
      console.log("Query Response:", response);
      setSelectedOption("");
      setQueryTitle("");
      setQueryDescription("");
    } catch (error) {
      console.error("Error submitting query:", error.message);
      alert("Failed to submit query. Please try again.");
    }
  };

  return (
    <div className=" min-h-[576px] h-auto bg-white bg-opacity-80 shadow-md rounded-lg p-6 pt-10 max-2xl">
      <h2 className="text-lg font-semibold mb-4">Create New Query</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Select a Clinic:
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 mt-1"
          >
            <option value="">Choose a Clinic</option>
            {clinics.map((clinic) => (
              <option key={clinic._id} value={clinic._id}>
                {clinic.name} ({clinic.email})
              </option>
            ))}
          </select>
        </label>

        <label className="block mb-2 mt-4">
          Query Title:
          <input
            type="text"
            value={queryTitle}
            onChange={(e) => setQueryTitle(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 mt-1"
            placeholder="Enter the query title..."
          />
        </label>

        <label className="block mb-2 mt-4">
          Your Query:
          <textarea
            value={queryDescription}
            onChange={(e) => setQueryDescription(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 mt-1 h-52"
            rows="4"
            placeholder="Enter your query here..."
          />
        </label>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded p-2 mt-4 hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default QueryCard;
