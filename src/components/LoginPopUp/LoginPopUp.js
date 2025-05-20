import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext.js";
import axios from "axios";
import Logo from "../../assests/logo.jpg";

function LoginPopUp({ setShowLogin, formType, setFormType }) {
  const { url, setToken } = useContext(StoreContext);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let endpoint = url;
    endpoint += formType === "Login" ? "/api/user/login" : "/api/user/register";

    try {
      const response = await axios.post(endpoint, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An unexpected error occurred."
      );
    }
  };

  useEffect(() => {
    setErrorMessage("");
  }, [formType]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4 font-passion">
      <div className="bg-mygray w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-6 rounded-lg shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={() => setShowLogin(false)}
          className="text-gray-500 hover:text-gray-700 text-2xl absolute right-5 top-3 font-bold"
        >
          &times;
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="h-14 sm:h-16 md:h-20" />
        </div>

        {/* Heading */}
        <div className="flex justify-center items-center mb-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black text-center">
            {formType === "Login" ? (
              <>
                LOG <span className="text-orange-500">IN</span>
              </>
            ) : (
              <>
                SIGN <span className="text-orange-500">IN</span>
              </>
            )}
          </h2>
        </div>

        {/* Switch Form Link */}
        <div className="text-sm text-center text-gray-600 mb-5 sm:mb-6">
          {formType === "Login" ? (
            <>
              Don't have an account?{" "}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setFormType("Sign Up");
                }}
                className="text-blue-600 hover:text-blue-700"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setFormType("Login");
                }}
                className="text-blue-600 hover:text-blue-700"
              >
                Login
              </button>
            </>
          )}
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-600 text-sm p-3 rounded-lg">
            <strong>{errorMessage}</strong>
          </div>
        )}

        {/* Form */}
        <form onSubmit={onLogin}>
          {formType === "Sign Up" && (
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                onChange={onChangeHandler}
                value={data.name}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900"
                placeholder="John Doe"
                required
              />
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900"
              placeholder="name@example.com"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-ouror opacity-90 hover:opacity-100 text-white py-3 text-sm sm:text-base font-semibold rounded-lg transition duration-300"
          >
            {formType === "Login" ? "Login" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPopUp;
