import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaUser, FaArrowLeft } from "react-icons/fa"; // Importing arrow and user icons
import { useAuth } from "../context/AuthContext";
import { useJourney } from "../context/JourneyContext";

function MyJourneyForm() {
  const location = useLocation(); // Get the passed journey
  const [journey, setJourney] = useState(
    location.state ? { ...location.state, isAdmin: false } : { isAdmin: false }
  );

  const { user } = useAuth();
  const {
    fetchPassengersDetails,
    deleteJourneyInfo,
    exitJourney,
    cancelJourney,
    restartJourney,
  } = useJourney();
  const navigate = useNavigate();

  const [selectedJourney, setSelectedJourney] = useState(null);

  // const handleExitJourney = async(e) => {

  //   e.stopPropagation();
  //   await exitJourney(journey?._id);

  //   toast.success("You have exited the journey successfully!");
  //   window.history.back();
  // };

  const handleExitJourney = async (e) => {
    e.stopPropagation();
    await exitJourney(journey?._id);

    toast.success("You have exited the journey successfully!");
    navigate(-1); // Navigate back
  };
  useEffect(() => {
    // Check if the user is the creator of the journey
    if (journey.userId === user._id) {
      setJourney((prevJourney) => ({
        ...prevJourney,
        isAdmin: true, // Set the isAdmin flag to true
      }));
    }
  }, [journey.userId, user._id]); // Add dependencies to ensure it runs when either journey or user changes

  useEffect(() => {
    const fetchDetails = async () => {
      const { userDetails } = await fetchPassengersDetails(journey.passengers); // Await the async function

      console.log("user details from backend", userDetails);
      if (!userDetails) return;
      setJourney((prev) => {
        return { ...prev, passengers: [...userDetails] };
      });
    };

    const users = journey.passengers;
    console.log("passsemnkvpbpwp[[e", users);
    fetchDetails(); // Call the async function
  }, []);

  const handleDeleteJourney = (e) => {
    e.stopPropagation();
    if (journey?.userId !== user?._id) {
      return;
    }
    deleteJourneyInfo(journey?._id);

    toast.success("Journey deleted successfully!");
    window.history.back();
  };

  const handleCancelJourney = async (e) => {
    e.stopPropagation();
    await cancelJourney(journey?._id);
    // toast.success("Journey canceled successfully!");
    setJourney({ ...journey, status: "cancelled" });
  };

  const handleFareChange = (e) => {
    setJourney({ ...journey, fare: parseFloat(e.target.value) });
  };

  const handleDescriptionChange = (e) => {
    setJourney({ ...journey, journeyDescription: e.target.value });
  };

  const handlePassengerRequirementChange = (e) => {
    setJourney({ ...journey, passengerRequired: parseInt(e.target.value) });
  };

  const togglePassengerDetails = () => {
    setSelectedJourney((prev) => (prev === journey._id ? null : journey._id));
  };

  const handleGoBack = () => {
    window.history.back(); // Navigate to the previous page
  };

  const handleRestartJourney = async (e) => {
    e.stopPropagation();
    await restartJourney(journey._id);
    setJourney({ ...journey, status: "Active" });
  };
  // const handleDeleteJourney = (e) => {
  //   e.stopPropagation();
  //   if (journey?.userId !== user?._id) {
  //     return;
  //   }
  //   deleteJourneyInfo(journey?._id);
  //   toast.success("Successfully deleted journey item");
  // };

  console.log("journey here is  in journey form", journey);
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-lg p-10 max-w-4xl w-full relative">
        {/* Back Arrow */}
        <button
          onClick={handleGoBack}
          className="absolute top-4 left-4 text-gray-700 hover:text-gray-900 focus:outline-none"
        >
          <FaArrowLeft className="text-2xl" />
        </button>

        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          My Journey
          
        </h2>

        <div className="bg-gray-50 shadow-lg rounded-lg p-6 mb-8 relative border border-gray-200">
          {/* Journey Status displayed at the top-right */}
          <div className="absolute top-4 right-4">
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
              {journey.status.charAt(0).toUpperCase() + journey.status.slice(1)}
            </span>
          </div>

          {/* Journey Date, Time, and Status */}
          <div className="flex justify-between mb-4">
            <div>
              <p className="text-lg font-semibold text-gray-700">
                Date:{" "}
                <span className="text-gray-800">
                  {new Date(journey.journeyDate).toLocaleDateString()}
                </span>
              </p>
              <p className="text-lg font-semibold text-gray-700">
                Time:{" "}
                <span className="text-gray-800">{journey.journeyTime}</span>
              </p>
            </div>
          </div>

          {/* Start and End Locations */}
          <div className="flex justify-between mb-6">
            <p className="text-lg">
              <strong>From:</strong>{" "}
              <span className="text-green-700 font-semibold">
                {journey.journeyStartLocation}
              </span>
            </p>
            <p className="text-lg">
              <strong>To:</strong>{" "}
              <span className="text-green-700 font-semibold">
                {journey.journeyEndLocation}
              </span>
            </p>
          </div>

          {/* Editable Fare for Admin */}
          {journey.isAdmin && (
            <div className="mb-4 text-gray-700 font-semibold">
              <label htmlFor="fare" className="text-lg">
                Overall Fare: ₹
              </label>
              <input
                id="fare"
                type="number"
                value={journey.fare}
                onChange={handleFareChange}
                className="ml-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
          )}

          <div className="mb-4 text-gray-700 font-semibold">
            <label htmlFor="fare" className="text-lg">
              Fare Per Head: ₹
            </label>
            <input
              id="fare"
              type="number"
              value={journey.fare / journey.passengers.length}
              readOnly
              className="ml-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 pointer-events-none"
            />
          </div>

          {/* Passengers Required */}
          {journey.isAdmin && (
            <div className="mb-4 text-gray-700 font-semibold">
              <label htmlFor="requiredPassengers" className="text-lg">
                Passengers Required:{" "}
              </label>
              <input
                id="requiredPassengers"
                type="number"
                value={journey.passengerRequired}
                onChange={handlePassengerRequirementChange}
                className="ml-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
          )}

          {/* Passenger Details */}
          <div className="mb-4">
            <p
              className="text-lg cursor-pointer text-green-600 underline"
              onClick={() => togglePassengerDetails()}
            >
              Passenger Details
            </p>
            {selectedJourney === journey._id && (
              <div className="pl-4 mt-2 space-y-4">
                {journey.passengers.map((passenger, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm hover:bg-gray-200 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <FaUser className="text-green-600" />{" "}
                      {/* Icon for passenger */}
                      <div>
                        <p className="text-sm font-semibold text-gray-700">
                          {passenger.fullName.toUpperCase()}
                        </p>
                        <p className="text-xs text-gray-500">
                          Enrollment: {passenger.enrollmentNo.toUpperCase()}
                        </p>
                        <p className="text-xs text-gray-500">
                          Phone: {passenger.phoneNo}
                        </p>
                      </div>
                    </div>

                    {/* Remove passenger button if the user is admin */}
                    {journey.isAdmin && passenger._id !== journey.userId && (
                      <button
                        onClick={() => handleExitJourney(passenger._id)}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-4 rounded-lg transition-all"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Editable Journey Description for Admin */}
          <div className="mb-6">
            <label htmlFor="description" className="text-lg text-gray-700">
              <strong>Description:</strong>
            </label>
            {journey.isAdmin ? (
              <textarea
                id="description"
                value={journey.journeyDescription}
                onChange={handleDescriptionChange}
                className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            ) : (
              <p className="text-gray-700">{journey.journeyDescription}</p>
            )}
          </div>

          {/* Admin Controls: Delete and Cancel Journey */}
          {journey.isAdmin && (
            <div className="flex justify-between items-center">
              <button
                onClick={handleDeleteJourney}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-all"
              >
                Delete Journey
              </button>

              {journey.status === "cancelled" ? (
                <button
                  onClick={handleRestartJourney}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded-lg transition-all"
                >
                  Restart Journey
                </button>
              ) : (
                <button
                  onClick={handleCancelJourney}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded-lg transition-all"
                >
                  Cancel Journey
                </button>
              )}
            </div>
          )}
        </div>

        {/* Exit Journey Button for General Users */}
        {!journey.isAdmin && (
          <div className="flex justify-end mt-6">
            <button
              onClick={handleExitJourney}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-all"
            >
              Exit Journey
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyJourneyForm;
