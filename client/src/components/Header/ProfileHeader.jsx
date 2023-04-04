import { useDispatch } from "react-redux";
import {
  changeEditModal,
  changeCategoryModal,
} from "../../features/editModalSlice.js";
import { AiOutlineLogout } from "react-icons/ai";
import React from "react";
import { logout } from "../../features/auth/authSlice.js";

const ProfileHeader = () => {
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(changeEditModal(true));
  };
  return (
    <div className="flex items-center space-x-5">
      <div
        onClick={openModal}
        className="w-36 border p-2 rounded-md text-center text-white cursor-pointer
        hover:bg-violet-800"
      >
        Add Coin
      </div>
      <div
        onClick={() => {
          console.log("cat");
          dispatch(changeCategoryModal(true));
        }}
        className="w-36 border p-2 rounded-md text-center text-white cursor-pointer
        hover:bg-violet-800"
      >
        Add Category
      </div>
      <AiOutlineLogout
        onClick={() => {
          dispatch(logout());
        }}
        size={25}
        className="text-white cursor-pointer hover:text-violet-400"
      />
    </div>
  );
};
export default ProfileHeader;
