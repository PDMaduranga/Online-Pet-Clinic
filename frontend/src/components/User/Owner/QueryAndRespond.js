import React, { useEffect, useState } from "react";
import { fetchOwnerQueries } from "../../../apis/api";

const OwnerQueries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadQueries = async () => {
      try {
        const data = await fetchOwnerQueries();
        setQueries(data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadQueries();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-600">
          Loading queries...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Queries</h2>
      {queries.length === 0 ? (
        <p className="text-gray-600">You have not submitted any queries yet.</p>
      ) : (
        <div className="space-y-6">
          {queries.map((query) => (
            <div
              key={query._id}
              className="bg-white bg-opacity-80 border border-gray-200 rounded-lg shadow-md p-6"
            >
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {query.title}
              </h3>
              <p className="text-gray-600">
                <strong>Description:</strong> {query.description}
              </p>
              <p className="text-gray-600 mt-2">
                <strong>Clinic:</strong> {query.clinic.name} (
                {query.clinic.email})
              </p>
              <p className="text-gray-600 mt-2">
                <strong>Status:</strong>{" "}
                <span
                  className={`${
                    query.status === "Open" ? "text-blue-500" : "text-green-500"
                  } font-medium`}
                >
                  {query.status}
                </span>
              </p>
              <div className="mt-4 bg-gray-100 p-4 rounded">
                <p className="text-gray-700">
                  <strong>Response:</strong>{" "}
                  {query.response ? query.response : "No response yet"}
                </p>
              </div>
              <p className="text-gray-500 text-sm mt-3">
                Submitted on:{" "}
                {new Date(query.createdAt).toLocaleDateString("en-US")} at{" "}
                {new Date(query.createdAt).toLocaleTimeString("en-US")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerQueries;
