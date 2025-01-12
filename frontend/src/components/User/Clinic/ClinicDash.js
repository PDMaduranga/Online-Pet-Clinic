import React, { useState, useEffect } from "react";
import { getClinicQueries, respondToQuery } from "../../../apis/api";

const ClinicDashboard = () => {
  const [queries, setQueries] = useState([]);
  const [response, setResponse] = useState("");
  const [selectedQuery, setSelectedQuery] = useState(null);

  // Fetch queries on component mount
  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const queriesData = await getClinicQueries();
        setQueries(queriesData);
      } catch (error) {
        console.error("Error fetching queries:", error.message);
      }
    };

    fetchQueries();
  }, []);

  const handleSelectQuery = (query) => {
    setSelectedQuery(query);
    setResponse(query.response || ""); // Pre-fill if a response exists
  };

  const handleResponseChange = (e) => {
    setResponse(e.target.value);
  };

  const handleSubmitResponse = async (e) => {
    e.preventDefault();
    if (!selectedQuery || !response) {
      alert("Please select a query and provide a response!");
      return;
    }

    try {
      const result = await respondToQuery({
        queryId: selectedQuery._id,
        response,
      });
      alert("Response submitted successfully!");
      console.log("Response Result:", result);
      setSelectedQuery(null);
      setResponse("");
      // Refresh queries
      const updatedQueries = await getClinicQueries();
      setQueries(updatedQueries);
    } catch (error) {
      console.error("Error submitting response:", error.message);
      alert("Failed to submit response. Please try again.");
    }
  };
  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/assets/pet clinic Backgraund.jpg')" }}
    >
      <div className=" min-h-[576px] bg-white shadow-md rounded-lg p-6 pt-10 w-4/5 bg-opacity-80">
        <h1 className="text-lg font-bold mb-4">Clinic Dashboard</h1>
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Queries List</h3>
          <ul className="border border-gray-300 rounded p-4 h-64 overflow-y-auto">
            {queries.map((query) => (
              <li
                key={query._id}
                className={`p-2 border-b cursor-pointer ${
                  selectedQuery?._id === query._id ? "bg-gray-200" : ""
                }`}
                onClick={() => handleSelectQuery(query)}
              >
                <strong>Owner:</strong> {query.owner.name} ({query.owner.email})
                <br />
                <strong>Title:</strong> {query.title}
                <br />
                <strong>Description:</strong> {query.description}
                <br />
                <strong>Status:</strong> {query.status}
              </li>
            ))}
          </ul>
        </div>

        {selectedQuery && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Respond to Query</h3>
            <form onSubmit={handleSubmitResponse}>
              <textarea
                value={response}
                onChange={handleResponseChange}
                className="w-full border border-gray-300 rounded p-2 mb-4 h-24"
                placeholder="Enter your response..."
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
              >
                Submit Response
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClinicDashboard;
