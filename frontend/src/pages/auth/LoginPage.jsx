import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/Shared/InputField";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authSlice"; // Import the login action
import { login as apiLogin } from "../../api/auth"; // Import the login API function

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!email || !password) {
      setError("Email and Password are required.");
      return;
    }

    try {
      // Make the login request using the API utility
      const { user, token } = await apiLogin({ email, password });

      // Dispatch user and token to Redux store
      dispatch(login({ user, token }));

      // Redirect to the dashboard after login
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-lg w-96"
      >
        <h2 className="text-center text-xl font-bold mb-6">Login</h2>

        {/* Display error message if login fails */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        <button
          type="submit"
          className="btn-primary w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
