import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handdleGetStart = () => {
    navigate("/registationselection");
  };

  return (
    <>
      <div
        className="flex flex-col items-center justify-center h-screen bg-cover bg-center p-6"
        style={{ backgroundImage: "url('/assets/pet clinic Backgraund.jpg')" }}
      >
        <div className="bg-white bg-opacity-70 p-8 rounded-lg shadow-lg text-center max-w-2xl">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome to the Pet Clinic Platform
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Connect with pet clinics and get the help you need for your pets!
          </p>
          <button
            onClick={handdleGetStart}
            className="mt-6 px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
          >
            Get Started
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;

