import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { logout } from "../futures/auth/authSlice.js";
import { useNavigate } from "react-router-dom";
import { changeEditModal } from "../futures/editModalSlice.js";
import Login from "./Auth/Login.jsx";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fnLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  return (
    <div className="h-20 bg-violet-600 flex items-center justify-between px-5">
      <div className="text-white font-bold text-2xl cursor-pointer">
        Coin Social Media
      </div>
      <div className="">
        <Login />
      </div>
    </div>
  );
};

export default Header;
