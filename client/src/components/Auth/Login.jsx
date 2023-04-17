import React, { useEffect } from "react";
import { useFormik } from "formik";
import { userLoginSchema } from "../../schemas/index.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../features/auth/authActions.js";
import Spinner from "../Spinner/Spinner.jsx";
import { GrClose } from "react-icons/gr";
import {
  changeSignInModal,
  changeSignUpModal,
} from "../../features/auth/authSlice.js";

const Login = () => {
  const { loading, name } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (name) {
      navigate("/");
    }
  }, [navigate, name]);

  const onSubmit = (values) => {
    dispatch(userLogin(values));
  };

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userLoginSchema,
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
            dispatch(changeSignInModal(false));
          }}
          className="flex justify-between items-center cursor-pointer"
        >
          <h1 className="text-2xl text-gray-700 font-bold">Coin Social App</h1>
          <GrClose size={20} />
        </div>
        <div className="flex flex-col space-y-3 my-3">
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

          <div className="text-red-500 text-xs cursor-pointer mb-4">
            <span
              onClick={() => {
                dispatch(changeSignInModal(false));
                dispatch(changeSignUpModal(true));
              }}
            >
              Registration
            </span>
          </div>
          <button
            className="cursor-pointer w-full text-center bg-violet-600 transition-all hover:bg-violet-800 text-white py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? <Spinner /> : "Sign In"}
          </button>
        </div>
      </div>
    </form>
  );
};
export default Login;
