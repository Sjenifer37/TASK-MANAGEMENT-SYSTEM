import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import loginBg from "../assets/login-bg.jpg"; // your background image

function Login({ setUserRole }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!role) {
      setError("Please select Admin or Employee");
      return;
    }

    if (email === "admin@gmail.com" && password === "12345" && role === "admin") {
      dispatch(setUser({ email, role }));
      setUserRole("admin");
      return;
    }

    if (email === "employee@gmail.com" && password === "12345" && role === "employee") {
      dispatch(setUser({ email, role }));
      setUserRole("employee");
      return;
    }

    setError("Invalid credentials or role");
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
    

      {/* BLUE LOGIN CARD */}
      <div className="relative bg-transparent text-white p-8 w-96 rounded-2xl shadow-2xl">

        <h2 className="text-3xl font-bold text-center mb-6">LOGIN</h2>

        {error && <p className="text-red-200 text-center font-semibold mb-4">{error}</p>}

        <form onSubmit={handleLogin}>

          {/* Role Selection */}
          <div className="flex justify-between mb-5">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="admin"
                checked={role === "admin"}
                onChange={(e) => setRole(e.target.value)}
              />
              <span>Admin</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="employee"
                checked={role === "employee"}
                onChange={(e) => setRole(e.target.value)}
              />
              <span>Employee</span>
            </label>
          </div>

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 rounded-lg text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-6 rounded-lg text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-black/30 hover:bg-black/40 text-white p-3 rounded-lg font-semibold transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
