import React, { useEffect, useState } from "react";
import { getPendingClinics, approveClinic, deleteClinic } from "../../apis/api";

const AdminDashboard = () => {
  const [pendingClinics, setPendingClinics] = useState([]);

  // Fetch pending clinics from the server
  useEffect(() => {
    const fetchPendingClinics = async () => {
      try {
        const clinics = await getPendingClinics();
        setPendingClinics(clinics);
      } catch (error) {
        console.error("Error fetching pending clinics:", error.message);
      }
    };
    fetchPendingClinics();
  }, []);

  // Approve a clinic
  const handleApproveClinic = async (clinicId) => {
    try {
      await approveClinic(clinicId);
      const updatedClinics = await getPendingClinics();
      setPendingClinics(updatedClinics);
    } catch (error) {
      console.error("Error approving clinic:", error.message);
    }
  };

  // Delete a clinic
  const handleDeleteClinic = async (clinicId) => {
    try {
      await deleteClinic(clinicId);
      setPendingClinics(
        pendingClinics.filter((clinic) => clinic._id !== clinicId)
      );
    } catch (error) {
      console.error("Error deleting clinic:", error.message);
    }
  };
  return (
    <>
      <div
        className="flex flex-col items-center justify-center h-screen bg-cover bg-center p-6"
        style={{ backgroundImage: "url('/assets/pet clinic Backgraund.jpg')" }}
      >
        <div className="p-6 bg-white bg-opacity-80 h-4/5 w-4/5 shadow-md rounded-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Pending Clinics
          </h2>
          {pendingClinics.length > 0 ? (
            <ul className="space-y-4">
              {pendingClinics.map((clinic) => (
                <li
                  key={clinic._id}
                  className="bg-white shadow-md rounded-md p-4 border border-gray-300"
                >
                  <p className="mb-2">
                    <strong>Name:</strong> {clinic.name}
                  </p>
                  <p className="mb-2">
                    <strong>Email:</strong> {clinic.email}
                  </p>
                  <p className="mb-4">
                    <strong>Approved:</strong>{" "}
                    <span
                      className={`font-semibold ${
                        clinic.approved ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {clinic.approved ? "Yes" : "No"}
                    </span>
                  </p>
                  <div className="flex space-x-4">
                    {!clinic.approved && (
                      <button
                        onClick={() => handleApproveClinic(clinic._id)}
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
                      >
                        Approve
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteClinic(clinic._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-600">No pending clinics</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
