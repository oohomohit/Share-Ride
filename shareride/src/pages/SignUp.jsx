import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [enrollmentNumber, setEnrollmentNumber] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for spinner
  const { createUser } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (enrollmentNumber && password && fullName && phoneNo) {
      setLoading(true); // Start loading when submitting form
      try {
        const res = await createUser(
          fullName,
          enrollmentNumber,
          phoneNo,
          password
        );
        if (!res || res.error) {
          setEnrollmentNumber("");
          setFullName("");
          setPhoneNo("");
          setPassword("");
          toast.error(res.error || "An error occurred");
        } else {
          toast.success("User created successfully!");
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
        toast.error("An unexpected error occurred");
      } finally {
        setLoading(false); // Stop loading when request is done
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto font-[sans-serif] p-6">
      <div className="text-center mb-16">
        <img
          src="Share-Ride-logo.png"
          alt="logo"
          className="w-52 inline-block"
        />
        <h4 className="text-gray-800 text-base font-semibold mt-6">
          Sign up into your account
        </h4>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <label className="text-gray-800 text-sm mb-2 block">
              Full Name
            </label>
            <input
              name="name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter name"
              required
            />
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">
              Enrollment Number
            </label>
            <input
              name="enrollmentNumber"
              type="text"
              value={enrollmentNumber}
              onChange={(e) => setEnrollmentNumber(e.target.value)}
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter enrollment number"
              required
            />
          </div>

          <div>
            <label className="text-gray-800 text-sm mb-2 block">
              Mobile No.
            </label>
            <input
              name="mobileNumber"
              type="number"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter mobile number"
              required
            />
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Password</label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter password"
              required
            />
          </div>
        </div>

        {/* Center the button and add spinner */}
        <div className="flex justify-center mt-12">
          <button
            type="submit"
            className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            disabled={loading} // Disable button when loading
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <ClipLoader color="#fff" loading={loading} size={20} />
                <span className="ml-3">Signing up...</span>
              </div>
            ) : (
              "Sign up"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
