import { useNavigate } from "react-router-dom";

const RegistrationSelection = () => {
  const navigate = useNavigate();

  const handleRegisterClinic = () => {
    navigate("/clinicregister", { state: { type: "clinic" } });
  };

  const handleRegisterOwner = () => {
    navigate("/ownerregister", { state: { type: "owner" } });
  };

  const handleLogin = () => {
    navigate("/userlogin");
  };

  return (
    <>
      <div
        className="flex flex-col items-center justify-center h-screen bg-cover bg-center p-6"
        style={{ backgroundImage: "url('/assets/pet clinic Backgraund.jpg')" }}
      >
        <div className="flex-col items-center justify-center bg-white bg-opacity-70 p-12 rounded-lg shadow-lg text-center max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Select Registration Type
          </h2>
          <div className="flex gap-6">
            <button
              onClick={handleRegisterClinic}
              className="px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
            >
              Clinic Registration
            </button>
            <button
              onClick={handleRegisterOwner}
              className="px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
            >
              Pet Owner Registration
            </button>
          </div>
          <p className="mt-6 text-gray-600">
            Already have an account?{" "}
            <button
              onClick={handleLogin}
              className="text-blue-600 hover:underline"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegistrationSelection;
