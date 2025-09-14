import React from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { FaUtensils, FaPen, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const { myShopData } = useSelector((state) => state.owner);

  return (
    <div className="w-[100vw] min-h-[100vh] flex flex-col items-center bg-[#fff9f6]">
      <Navbar />

      {/* No shop yet */}
      {!myShopData && (
        <div className="flex justify-center items-center p-4 mt-16">
          <div className="w-full max-w-sm bg-white shadow-lg rounded-2xl p-4 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col items-center text-center">
              <FaUtensils className="text-[#ff4d2d] w-14 h-14 mb-3" />
              <h2 className="text-lg font-bold text-gray-800 mb-1">
                Add Your Restaurant
              </h2>
              <p className="text-gray-600 mb-3 text-sm">
                Partner with us and bring your food to thousands of hungry
                hearts.
              </p>
              <button
                className="bg-[#ff4d2d] text-white px-4 py-2 rounded-lg font-medium shadow-md hover:bg-orange-600 transition-colors duration-200"
                onClick={() => navigate("/create-edit-shop")}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Shop exists */}
      {myShopData && (
        <div className="w-full flex flex-col items-center gap-4 px-4 sm:px-6 mt-10">
          {/* Welcome Heading */}
          <h1 className="text-xl sm:text-2xl font-medium text-gray-900 flex items-center gap-2 text-center mt-12">
            <FaUtensils className="text-[#ff4d2d] w-8 h-8" />
            Welcome to {myShopData.name}
          </h1>

          {/* Compact Shop Card (slightly wider) */}
          <div className="relative w-full max-w-md">
            <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300">
              <img
                src={myShopData.image}
                alt={myShopData.name}
                className="w-full h-36 sm:h-40 object-cover"
              />
              <div className="p-3">
                <h2 className="text-md font-bold text-gray-800 flex items-center gap-1">
                  <FaUtensils className="text-[#ff4d2d]" /> {myShopData.name}
                </h2>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                  <FaMapMarkerAlt className="text-orange-500" />{" "}
                  {myShopData.city},{myShopData.state}
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  {myShopData.address}
                </p>
              </div>
            </div>
            <div
              className="absolute top-2 right-2 bg-[#ff4d2d] text-white p-1.5 rounded-full shadow-md hover:bg-orange-600 transition-colors cursor-pointer"
              onClick={() => navigate("/create-edit-shop")}
            >
              <FaPen size={16} />
            </div>
          </div>

          {/* Compact Add Food Card */}
          {myShopData.items.length === 0 && (
            <div className="flex justify-center items-center w-full max-w-sm mt-5">
              <div className="bg-white shadow-md rounded-xl p-4 border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
                <FaUtensils className="text-[#ff4d2d] w-12 h-12 mb-2" />
                <h2 className="text-md font-bold text-gray-800 mb-1">
                  Add Your Food Item
                </h2>
                <p className="text-gray-600 text-sm mb-3">
                  Showcase your delicious dishes by adding them to the menu.
                </p>
                <button
                  className="bg-[#ff4d2d] text-white px-4 py-2 rounded-lg font-medium shadow-md hover:bg-orange-600 transition-colors duration-200"
                  onClick={() => navigate("/add-items")}
                >
                  Add Food
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;
