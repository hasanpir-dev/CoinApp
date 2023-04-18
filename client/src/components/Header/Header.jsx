import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AuthHeader from "./AuthHeader.jsx";
import ProfileHeader from "./ProfileHeader.jsx";
import getAuthorized from "../../utilities/getAuthorized.js";
import { getAuth } from "../../features/auth/authSlice.js";
import { getCategories } from "../../features/category/categoryActions.js";

const Header = () => {
  const navigate = useNavigate();
  const authorized = useSelector((state) => state.auth.authorized);
  const dispatch = useDispatch();
  useEffect(() => {
    getAuthorized().then((res) => {
      if (res) {
        const name = res.data.name;
        const id = res.data.id;
        const success = res.success;
        dispatch(getAuth({ name, id, success }));
      }
    });
  }, [authorized]);

  const title = useSelector((state) => state.category.title);

  useEffect(() => {
    dispatch(getCategories({ title }));
  }, [dispatch, title]);

  return (
    <div className="h-20 bg-violet-600 flex items-center justify-between px-5">
      <div
        onClick={() => navigate("/")}
        className="hidden xs:inline-block text-white font-bold text-2xl cursor-pointer"
      >
        Coin Social App
      </div>
      <>{!authorized ? <AuthHeader /> : <ProfileHeader />}</>
    </div>
  );
};

export default Header;
