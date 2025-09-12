import React, { useState } from "react";
import { FaLocationDot, FaReceipt } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../../redux/userSlice";
import { FaPlus } from "react-icons/fa";

const Navbar = () => {
  const { userData, city } = useSelector((state) => state.user);
  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    // Navbar
    <div className="w-full h-[80px] flex items-center justify-between md:justify-center gap-[30px] px-[20px] fixed top-0 z-[9999] bg-[#fff9f6] overflow-visible">
      {/* mobile search */}
      {showSearch && userData.role == "user" && (
        <div className="w-[90%] h-[50px] bg-white shadow-xl rounded-lg flex items-center gap-[20px] fixed top-[80px] left-[5%] md:hidden ">
          <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400">
            <FaLocationDot size={25} className="text-[#ff4d2d]" />
            <div className="w-80% truncate text-gray-600">{city}</div>
          </div>
          <div className="flex items-center gap-[10px]  w-[80%]">
            <IoIosSearch size={25} className="text-[#ff4d2d] cursor-pointer " />
            <input
              type="text"
              placeholder="Search Delicious Food..."
              className="px-[10px] text-gray-700 outline-0 w-full"
            />
          </div>
        </div>
      )}

      {/* logo */}
      <h1 className="text-3xl font-bold mb-2 text-[#ff4d2d]">DesiBites</h1>

      {/* desktop search */}
      {userData.role == "user" && (
        <div className="md:w-[60%] lg:w-[40%] h-[50px] bg-white shadow-xl rounded-lg flex items-center gap-[20px]  md:flex">
          <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400">
            <FaLocationDot size={25} className="text-[#ff4d2d]" />
            <div className="w-[80%] truncate text-gray-600">{city}</div>
          </div>
          <div className="flex items-center gap-[10px]  w-[80%]">
            <IoIosSearch size={25} className="text-[#ff4d2d]" />
            <input
              type="text"
              placeholder="Search Delicious Food..."
              className="px-[10px] text-gray-700 outline-0 w-full"
            />
          </div>
        </div>
      )}

      {/* right section */}
      <div className="flex items-center gap-[20px]">
        {userData.role === "user" &&
          (showSearch ? (
            <RxCross2
              size={25}
              className="text-[#ff4d2d] md:hidden"
              onClick={() => setShowSearch(false)}
            />
          ) : (
            <IoIosSearch
              size={25}
              className="text-[#ff4d2d] md:hidden"
              onClick={() => setShowSearch(true)}
            />
          ))}

        {/* owner nav */}
        {userData.role === "owner" ? (
          <>
            <button className="hidden md:flex  items-center gap-1 p-2 cursor-pointer rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d]">
              <FaPlus size={20} /> <span>Add Food Item</span>
            </button>
            {/* small device */}
            <button className="md:hidden flex  items-center gap-1 p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d]">
              <FaPlus size={20} />
            </button>
            <div className=" hidden md:flex relative  items-center gap-2 cursor-pointer  px-3 py-2 rounded-lg font-medium bg-[#ff4d2d]/10 text-[#ff4d2d] ">
              <FaReceipt size={20} />
              <span>My Orders</span>
              <span className="absolute -right-2 -top-2 text-xs font-bold text-white bg-[#ff4d2d] rounded-full px-[6px] py-[2px]">
                0
              </span>
            </div>
            {/* small device */}
            <div className="md:hidden flex relative items-center cursor-pointer p-2 rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d]">
              <FaReceipt size={22} />
              <span className="absolute -right-2 -top-2 text-xs font-bold text-white bg-[#ff4d2d] rounded-full px-[6px] py-[2px]">
                0
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="relative cursor-pointer">
              <FaShoppingCart size={25} className="text-[#ff4d2d]" />
              <span className="absolute right-[-6px] top-[-14px] text-[#ff4d2d] font-semibold">
                0
              </span>
            </div>

            <button className="hidden md:block px-4 py-1.5 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium ">
              My Order
            </button>
          </>
        )}

        <div
          className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#ff4d2d] text-white font-semibold text-xl shadow-lg text-18px cursor-pointer"
          onClick={() => setShowInfo((prev) => !prev)}
        >
          {userData?.fullName.slice(0, 1)}
        </div>

        {/* profile dropdown */}
        {showInfo && (
          <div className="fixed top-[80px] right-[10px] md:right-[10%] lg:right-[25%] w-[180px] bg-white shadow-2xl rounded-xl p-[20px] flex flex-col gap-[10px] z-[9999]">
            <div className="text-[17px] font-semibold cursor-pointer ">
              {userData.fullName}
            </div>
            <div className="text-[17px] font-semibold cursor-pointer md:hidden">
              My Orders
            </div>
            <div
              className="text-[#ff4d2d] font-semibold cursor-pointer"
              onClick={handleLogout}
            >
              Log Out
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
