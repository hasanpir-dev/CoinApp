import * as yup from "yup";

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
