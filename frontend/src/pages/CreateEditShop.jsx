import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";
import { serverUrl } from "../App";
import { setmyShopData } from "../../redux/ownerSlice";
import axios from "axios";

const CreateEditShop = () => {
  const navigate = useNavigate();
  const { myShopData } = useSelector((state) => state.owner);
  const { city, state, currentAddress } = useSelector((state) => state.user);

  const [name, setName] = useState(myShopData?.name || "");
  const [address, setAddress] = useState(myShopData?.address || currentAddress);
  const [currentCity, setCurrentCity] = useState(myShopData?.city || city);
  const [currentState, setCurrentState] = useState(myShopData?.state || state);
  const [frontendImage, setFrontendImage] = useState(myShopData?.image || null);
  const [backendImage, setBackendImage] = useState(null);

  const dispatch = useDispatch()

  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("city", currentCity);
      formData.append("state", currentState);
      formData.append("address", address);
      if (backendImage) {
        formData.append("image", backendImage);
      }
      const result = await axios.post(
        `${serverUrl}/api/shop/create-edit`,
        formData,
        { withCredentials: true }
      );
      dispatch(setmyShopData((result.data)))
      console.log(result.data)
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <div className="flex justify-center flex-col items-center p-6 bg-gradient-to-br from-orange-50 relative to-white min-h-screen">
      {/* Back Button */}
      <div className="absolute top-[20px] left-[20px] z-[10] mb-[10px]">
        <IoIosArrowRoundBack
          size={35}
          className="text-[#ff4d2d] cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>

      {/* Card */}
      <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 border border-orange-100">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-orange-100 p-4 rounded-full mb-4">
            <FaUtensils className="text-[#ff4d2d] w-16 h-16" />
          </div>
          <div className="text-3xl font-extrabold text-gray-900">
            {myShopData ? "Edit Shop" : "Add Shop"}
          </div>
          <p className="text-gray-500 text-sm mt-2">
            Fill in the details to{" "}
            {myShopData ? "update your shop" : "create your shop"}.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Shop Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Shop Name
            </label>
            <input
              type="text"
              placeholder="Enter Shop Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff4d2d] focus:border-transparent transition"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          {/* Shop Image */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Shop Image
            </label>
            <label
              htmlFor="shopImage"
              className="flex flex-col items-center justify-center w-full  px-4 py-3  border  rounded-lg cursor-pointer"
            >
              <span className=" font-medium">Click to upload image</span>
              <input
                id="shopImage"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImage}
              />
            </label>
            {frontendImage && (
              <div className="mt-4">
                <img
                  src={frontendImage}
                  alt=""
                  className="w-full h-48 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>

          {/* City & State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                placeholder="Enter Shop City"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff4d2d] focus:border-transparent transition"
                onChange={(e) => setCurrentCity(e.target.value)}
                value={currentCity}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                State
              </label>
              <input
                type="text"
                placeholder="Enter Shop State"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff4d2d] focus:border-transparent transition"
                onChange={(e) => setCurrentState(e.target.value)}
                value={currentState}
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Address
            </label>
            <textarea
              placeholder="Enter Shop Address"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff4d2d] focus:border-transparent transition resize-none"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            ></textarea>
          </div>

          {/* Submit Button */}
          <button className="w-full bg-[#ff4d2d] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg transition-all duration-200 cursor-pointer">
            {myShopData ? "Update Shop" : "Save Shop"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEditShop;
