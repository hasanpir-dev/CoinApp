import React from "react";
import { AiOutlineLogin } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  changeSignInModal,
  changeSignUpModal,
} from "../../features/auth/authSlice.js";

const AuthHeader = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="flex items-center space-x-5">
        <div
          onClick={() => {
            dispatch(changeSignInModal(true));
          }}
          className="w-36 border p-2 rounded-md text-center text-white cursor-pointer
        hover:bg-violet-800 transition-all"
        >
          Sign In
        </div>
        <div
          onClick={() => {
            dispatch(changeSignInModal(false));
            dispatch(changeSignUpModal(true));
          }}
          className="w-36 border p-2 rounded-md text-center text-white cursor-pointer
        hover:bg-violet-800 transition-all"
        >
          Sign Up
        </div>
        <AiOutlineLogin
          onClick={() => {
            dispatch(changeSignUpModal(false));
            dispatch(changeSignInModal(true));
          }}
          size={25}
          className="text-white cursor-pointer hover:text-violet-400 transition-all"
        />
      </div>
    </>
  );
};

export default AuthHeader;
