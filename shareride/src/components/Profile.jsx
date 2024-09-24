import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Profile.css"; // Assuming you'll create a CSS file for styling
import EditProfile from "./EditProfile";
import { useAuth } from "../context/AuthContext";
import { useJourney } from "../context/JourneyContext";

const Profile = () => {
  // const [user] = useState(null);

  const { user } = useAuth();
  const { allMyJourney } = useJourney();
  const [isopenedUpdateForm, setOpenUpdateForm] = useState(false);
  // const [
  //   // journeys,
  //   setJourneys,
  // ] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      try {
        // Hardcoded user data
        // const hardcodedUser = {
        //   fullName: "John Doe",
        //   phoneNo: "+1234567890",
        //   enrollmentNo: "123456",
        //   imageUrl:
        //     "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
        // };

        // Hardcoded journey data
        // const hardcodedJourneys = [
        //   {
        //     _id: "journey1",
        //     journeyStartLocation: "Main Gate",
        //     journeyEndLocation: "Downtown",
        //     journeyDate: "2024-09-20T00:00:00Z",
        //     journeyTime: "10:00 AM",
        //     journeyDescription: "A ride from the main gate to downtown.",
        //     status: "required",
        //     fare: 15,
        //   },
        //   {
        //     _id: "journey2",
        //     journeyStartLocation: "Campus Entrance",
        //     journeyEndLocation: "Airport",
        //     journeyDate: "2024-09-22T00:00:00Z",
        //     journeyTime: "3:00 PM",
        //     journeyDescription: "Airport transfer from the campus entrance.",
        //     status: "full",
        //     fare: 25,
        //   },
        // ];

        // Set the state with hardcoded data
        // setUser(hardcodedUser);
        // setJourneys(hardcodedJourneys);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpenEditProfileForm = () => {
    setOpenUpdateForm((prev) => !prev);
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={user.imageUrl} alt="Profile" className="profile-image" />
        <div className="profile-info-container">
          <h1 className="profile-name">{user.fullName?.toUpperCase()}</h1>

          <div className="profile-details">
            <div className="details-list">
              <p>
                <strong>Enrollment No:</strong> {user?.enrollmentNo?.toUpperCase()}
              </p>
              <p>
                <strong>Phone No:</strong> {user.phoneNo}
              </p>
              {/* <button type="button">Edit Profile</button> */}
            </div>
          </div>
        </div>
      </div>

      <div className="journey-container">
        {!isopenedUpdateForm ? (
          <div className="journey-info">
            <h2 className="RecentJourneysHeading">My Recent Journeys</h2>
            <div className="RecentJourneysList">
              <div className="the-journey">
                <h3>
                  {allMyJourney?.[0]?.journeyStartLocation || ""} to{" "}
                  {allMyJourney?.[0]?.journeyEndLocation || ""}
                </h3>

                <p>
                  <strong>Date: </strong>
                  {/* September 20, 2024 */}
                  {allMyJourney?.[1]?.journeyDate.split('T')[0] || ""}

                </p>
                <p>
                  <strong>Time: </strong>
                  {/* 10:00 AM */}
                  {allMyJourney?.[0]?.journeyTime || ""}
                </p>
                <p>
                  <strong>Status: </strong>
                  {/* Required */}
                  {allMyJourney?.[0]?.status || ""}
                </p>
                <p className="fare">
                  <strong>Fare: </strong>
                  {/* Rs 15 */}
                  Rs {allMyJourney?.[0]?.fare || ""}
                </p>
              </div>
              <div className="the-journey">
                <h3>
                  {allMyJourney?.[1]?.journeyStartLocation || ""} to{" "}
                  {allMyJourney?.[1]?.journeyEndLocation || ""}
                </h3>

                <p>
                  <strong>Date: </strong>
                  {/* September 20, 2024 */}
                  {allMyJourney?.[1]?.journeyDate.split('T')[0] || ""}

                </p>
                <p>
                  <strong>Time: </strong>
                  {/* 10:00 AM */}
                  {allMyJourney?.[1]?.journeyTime || ""}
                </p>
                <p>
                  <strong>Status: </strong>
                  {/* Required */}
                  {allMyJourney?.[1]?.status || ""}
                </p>
                <p className="fare">
                  <strong>Fare: </strong>
                  {/* Rs 15 */}
                   Rs {allMyJourney?.[1]?.fare || ""}
                </p>
              </div>
              {/* <div className="the-journey">
                <h3>Campus Entrance to Airport</h3>
                <p>
                  <strong>Date:</strong> September 22, 2024
                </p>
                <p>
                  <strong>Time:</strong> 3:00 PM
                </p>
                <p>
                  <strong>Status:</strong> Full
                </p>
                <p className="fare">
                  <strong>Fare:</strong> $25
                </p>
              </div> */}
            </div>
            <Link to="/app/myJourney" className="showMoreJourneys">
              Show More
            </Link>{" "}
          </div>
        ) : (
          <div className="EditProfileContainer">
            <EditProfile />
          </div>
        )}

        {isopenedUpdateForm ? (
          <button
            id="EditProfileBtn"
            type="button"
            onClick={handleOpenEditProfileForm}
          >
            Close Edit Profile Form
          </button>
        ) : (
          <button
            id="EditProfileBtn"
            type="button"
            onClick={handleOpenEditProfileForm}
          >
            Open Edit Profile Form
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
