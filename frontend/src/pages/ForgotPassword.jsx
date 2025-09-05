import axios from "axios";
import React from "react";
import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";


const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        { email },
        { withCredentials: true }
      );
      console.log(result);
      setError("");
      setStep(2);
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        { email, otp },
        { withCredentials: true }
      );
      console.log(result);
      setError("");
      setStep(3);
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };
  const handleResetPassword = async () => {
    if (newPassword !== confirmNewPassword) {
      return null;
    }
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        { email, newPassword },
        { withCredentials: true }
      );
      console.log(result);
      setError("");
      navigate("/signin");
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen p-4 bg-[#fff9f6]">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        <div className="flex items-center gap-3 cursor-pointer mb-4">
          <IoIosArrowRoundBack
            size={30}
            className="text-[#ff4d2d] "
            onClick={() => navigate("/signin")}
          />
          <h1 className="text-2xl font-bold text-center text-[#ff4d2d]">
            Forgot Password
          </h1>
        </div>
        {step === 1 && (
          <div>
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                Email
              </label>
              <input
                type="email"
                className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none "
                placeholder="Enter Your Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              <button
                className="w-full mt-4 font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer"
                onClick={handleSendOtp}
              >
                Send Otp
              </button>
              <p className="text-red-600 font-medium text-center my-[10px]">
                {error}
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="mb-2">
              <label
                htmlFor="otp"
                className="block text-gray-700 font-medium mb-1"
              >
                OTP
              </label>
              <input
                type="number"
                className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none "
                placeholder="Enter OTP"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                required
              />
              <button
                className="w-full mt-4 font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer"
                onClick={handleVerifyOtp}
              >
                Verify
              </button>
              <p className="text-red-600 font-medium text-center my-[10px]">
                {error}
              </p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="mb-2">
              {/* New Password */}
              <label
                htmlFor="newPassword"
                className="block text-gray-700 font-medium mb-1"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none mb-2"
                  placeholder="Enter New Password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                >
                  {showNewPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>

              {/* Confirm New Password */}
              <label
                htmlFor="confirmNewPassword"
                className="block text-gray-700 font-medium mb-1"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  value={confirmNewPassword}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>

              {/* Reset Button */}
              <button
                className="w-full mt-4 font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer"
                onClick={handleResetPassword}
              >
                Reset Password
              </button>
              <p className="text-red-600 font-medium text-center my-[10px]">
                {error}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
