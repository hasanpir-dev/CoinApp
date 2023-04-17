import React, { useEffect } from "react";
import "./auth.css";
import { useFormik } from "formik";
import { userRegisterSchema } from "../../schemas/index.js";
import { registerUser } from "../../features/auth/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner.jsx";
import { GrClose } from "react-icons/gr";
import {
  changeSignInModal,
  changeSignUpModal,
} from "../../features/auth/authSlice.js";

const Register = ({}) => {
  const { loading, name, success } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (success) navigate("/");
    if (name) navigate("/");
  }, [navigate, name, success]);

  const onSubmit = (values, actions) => {
    values.email = values.email.toLowerCase();
    let email = values.email;
    let password = values.password;
    let name = values.userName;
    dispatch(registerUser({ email, password, name }));
    actions.resetForm();
  };

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: userRegisterSchema,
    onSubmit,
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-screen bg-opacity-50 bg-black flex items-center justify-center fixed top-0 right-0 bottom-0 left-0 z-50"
      // className="w-full h-screen bg-gray-100 flex items-center justify-center fixed top-0 right-0 bottom-0 left-0 z-50 "
    >
      <div className="md:w-7/12 lg:w-1/3 w-full bg-white p-3 rounded-md">
        <div
          onClick={() => {
            dispatch(changeSignUpModal(false));
          }}
          className="flex justify-between items-center cursor-pointer"
        >
          <h1 className="text-2xl text-gray-700 font-bold">Coin Social App</h1>
          <GrClose size={20} />
        </div>

        <div className="flex flex-col space-y-3 my-3">
          <input
            type="text"
            className={errors.userName ? "input-error" : "input-style"}
            placeholder="Enter your Username"
            name="userName"
            value={values.userName}
            onChange={handleChange}
          />
          {errors.userName && (
            <span className="error-message">{errors.userName}</span>
          )}
          <input
            type="email"
            className={errors.email ? "input-error" : "input-style"}
            placeholder="Enter your Email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
          <input
            type="password"
            className={errors.password ? "input-error" : "input-style"}
            placeholder="Enter your Password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
          <input
            type="password"
            className={errors.confirmPassword ? "input-error" : "input-style"}
            placeholder="Confirm your Password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <span className="error-message">{errors.confirmPassword}</span>
          )}
        </div>

        <div className="text-red-500 text-xs cursor-pointer mb-4">
          <span
            onClick={() => {
              dispatch(changeSignUpModal(false));
              dispatch(changeSignInModal(true));
            }}
          >
            Already Registered?
          </span>
        </div>
        <button
          type="submit"
          className="w-full cursor-pointer bg-violet-600 hover:bg-violet-800 transition-all p-2 text-center text-white rounded-md"
          disabled={loading}
        >
          {loading ? <Spinner /> : "Register"}
        </button>
      </div>
    </form>
  );
};

export default Register;
