
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners"; // Import spinner from a library

function Login()

 {
  const [enrollmentNo, setEnrollmentNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state for spinner

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleForgetPasswordClick = () => {
    toast.success("Forgot password?");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (enrollmentNo && password) {
      setLoading(true); // Start loading
      try {
        await login(enrollmentNo, password);
        navigate("/app/")
      } catch (error) {
        console.log(error)
        toast.error("Login failed");
      } finally {
        setLoading(false); // Stop loading after login attempt
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    // <div>
      <div className="bg-gray-50 font-[sans-serif]">
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
          <div className="max-w-md w-full">
            {/* Centering the logo */}
            {/* <div className="flex justify-center mb-6">
              <img src="Share-Ride-logo.png" alt="logo" className="w-52" />
            </div> */}

          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">
              Sign in
            </h2>

            {/* Spinner loader when submitting */}
            {loading ? (
              <div className="flex justify-center py-4">
                <ClipLoader color="#36d7b7" loading={loading} size={40} />
              </div>
            ) : (
              <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    Enrollment Number
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="enrollment no."
                      type="text"
                      value={enrollmentNo}
                      onChange={(e) => setEnrollmentNumber(e.target.value)}
                      required
                      className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                      placeholder="Enter user name"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"} 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                      placeholder="Enter password"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-4 h-4 absolute right-4 cursor-pointer"
                      onClick={togglePasswordVisibility} 
                      viewBox="0 0 128 128"
                    >
                      <path
                        d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                        data-original="#000000"
                      />
                    </svg>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-3 block text-sm text-gray-800"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a
                      href="javascript:void(0);"
                      className="text-blue-600 hover:underline font-semibold"
                      onClick={handleForgetPasswordClick}
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div className="!mt-8">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                    disabled={loading} // Disable button when loading
                  >
                    Sign in
                  </button>
                </div>
                <p className="text-gray-800 text-sm !mt-8 text-center">
                  {`Don't have an account?`}
                  <a
                    href="javascript:void(0);"
                    className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                    onClick={handleSignupClick}
                  >
                    Register here
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;












