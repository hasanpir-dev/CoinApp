import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../futures/auth/authSlice.js";
import { useNavigate } from "react-router-dom";
import { changeEditModal } from "../../futures/editModalSlice.js";
import AuthHeader from "./AuthHeader.jsx";
import ProfileHeader from "./ProfileHeader.jsx";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { name } = useSelector((state) => state.auth);
  const authorized = name || userInfo;

  return (
    <div className="h-20 bg-violet-600 flex items-center justify-between px-5 w-[1280px] m-auto">
      <div className="text-white font-bold text-2xl cursor-pointer">
        Coin Social Media
      </div>
      <>{!authorized ? <AuthHeader /> : <ProfileHeader />}</>
    </div>
  );
};

export default Header;
