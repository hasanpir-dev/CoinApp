import React from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AuthHeader from "./AuthHeader.jsx";
import ProfileHeader from "./ProfileHeader.jsx";

const Header = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { name } = useSelector((state) => state.auth);
  const authorized = name || userInfo;

  return (
    <div className="h-20 bg-violet-600 flex items-center justify-between px-5">
      <div
        onClick={() => navigate("/")}
        className="text-white font-bold text-2xl cursor-pointer"
      >
        Coin Social App
      </div>
      <>{!authorized ? <AuthHeader /> : <ProfileHeader />}</>
    </div>
  );
};

export default Header;
