import axios from "axios";
import React, { useEffect } from "react";
import { serverUrl } from "../src/App";
import { useDispatch } from "react-redux";

import { setmyShopData } from "../redux/ownerSlice";

const useGetMyShop = () => {
    const dispatch = useDispatch()
  useEffect(() => {
    const fetchShop = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/shop/get-my`, {
          withCredentials: true,
        });
        dispatch(setmyShopData(result.data))
      } catch (error) {
        console.log(error)
      }
    };
    fetchShop();
  }, []);
};

export default useGetMyShop;
