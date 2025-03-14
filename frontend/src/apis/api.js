import axios from "axios";

const API_URL = "https://online-pet-clinic.onrender.com"; // Adjust to your backend server URL

// Register User or Admin
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("Registration failed");
  }
};

export const registerAdmin = async (adminData) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/adminregister`,
      adminData
    );
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("Registration failed");
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Login failed");
  }
};

export const adminlogin = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/adminlogin`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Login failed");
  }
};

// Get Pending Clinics
export const getPendingClinics = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/admin/clinics`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || "Failed to fetch clinics");
  }
};

// Approve Clinic
export const approveClinic = async (clinicId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${API_URL}/admin/approve/${clinicId}`,
      { clinicId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || "Failed to approve clinic");
  }
};

// Delete Clinic
export const deleteClinic = async (clinicId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `${API_URL}/admin/delete-clinic/${clinicId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || "Failed to delete clinic");
  }
};

// Get queries and response Clinics
export const getResponseToQuery = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/owner/responsestoqueries`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || "Failed to fetch response");
  }
};

export const getAvailableClinics = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/owner/availableclinics`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || "Failed to fetch clinics");
  }
};

export const makeAQuary = async ({ title, description, clinicId }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}/owner/ask`,
      { title, description, clinicId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || "Query submission failed");
  }
};

export const getClinicQueries = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/clinic/queries`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || "Failed to fetch queries");
  }
};

export const respondToQuery = async ({ queryId, response }) => {
  try {
    const token = localStorage.getItem("token");
    const result = await axios.post(
      `${API_URL}/clinic/respond/${queryId}`,
      { queryId, response },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return result.data;
  } catch (error) {
    throw new Error(
      error.response?.data.message || "Failed to submit response"
    );
  }
};

// Fetch all queries submitted by the owner
export const fetchOwnerQueries = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/owner/responsestoqueries`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || "Failed to fetch queries");
  }
};
