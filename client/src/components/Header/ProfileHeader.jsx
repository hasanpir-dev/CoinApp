import { useDispatch } from "react-redux";
import {
  changeEditModal,
  changeCategoryModal,
} from "../../features/editModalSlice.js";
import { AiOutlineLogout } from "react-icons/ai";
import React from "react";
import { logout } from "../../features/auth/authSlice.js";
import { isEditCoin } from "../../features/coin/coinSlice.js";

const ProfileHeader = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center space-x-5">
      <div
        onClick={() => {
          dispatch(changeEditModal(true));
          dispatch(isEditCoin(false));
        }}
        className="w-36 border p-2 rounded-md text-center text-white cursor-pointer
        hover:bg-violet-800 transition-all"
      >
        Add Coin
      </div>
      <div
        onClick={() => {
          dispatch(changeCategoryModal(true));
        }}
        className="w-36 border p-2 rounded-md text-center text-white cursor-pointer
        hover:bg-violet-800 transition-all"
      >
        Add Category
      </div>
      <AiOutlineLogout
        onClick={() => {
          dispatch(logout());
        }}
        size={25}
        className="text-white cursor-pointer hover:text-violet-400 transition-all"
      />
    </div>
  );
};
export default ProfileHeader;
