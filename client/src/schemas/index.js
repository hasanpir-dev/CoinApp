import * as yup from "yup";
import { useSelector } from "react-redux";

const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
export const userRegisterSchema = yup.object().shape({
  userName: yup
    .string()
    .min(5, "Please enter minimum 5 characters")
    .required("Please enter your username"),
  email: yup
    .string()
    .email("You must enter a valid email address")
    .required("Please enter your email"),
  password: yup
    .string()
    .matches(passwordRegex, {
      message:
        "Password must be contain at least 5 characters, 1 numeric character, lowercase letter, uppercase letter",
    })
    .required("You must enter a password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password must be equal")
    .required("You must enter a same password"),
});

export const userLoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("You must enter a valid email address")
    .required("Please enter your email"),
  password: yup
    .string()
    .matches(passwordRegex, {
      message:
        "Password must be contain at least 5 characters, 1 numeric character, lowercase letter, uppercase letter",
    })
    .required("You must enter a password"),
});

export const coinSchema = yup.object().shape({
  title: yup
    .string()
    .min(5, "Please enter minimum 5 characters")
    .max(30, "Please enter maximum 30 characters")
    .required("Please provide a title"),
  faceValue: yup.string().required("Please provide a value"),
  year: yup.number().required("Please provide a year"),
  price: yup.number().required("Please provide a price"),
  country: yup.string().required("Please provide a country"),
  metal: yup.string().required("Please provide a metal"),
  shortDesc: yup
    .string()
    .min(8, "Please enter minimum 8 characters")
    .max(250, "Please enter maximum 250 characters")
    .required("Please provide a short description"),
  longDesc: yup
    .string()
    .min(16, "Please enter minimum 16 characters")
    .max(650, "Please enter maximum 650 characters")
    .required("Please provide a long description"),
  quality: yup.string().required("Please provide a quality"),
  weight: yup.string().required("Please provide a weight"),
  imgObverse: yup.string().required("Please provide a observe image"),
  imgReverse: yup.string().required("Please provide a reverse imag"),
  category: yup
    .string()
    .min(1, "Please select a category")
    .required("Please select a category"),
});
