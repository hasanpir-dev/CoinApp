import React, { useState } from "react";
import Register from "../../components/Auth/Register.jsx";
import Login from "../../components/Auth/Login.jsx";

const Auth = () => {
  const [signUp, setSignUp] = useState(true);

  return (
    <>
      {signUp ? (
        <Login setSignUp={setSignUp} signUp={signUp} />
      ) : (
        <Register setSignUp={setSignUp} signUp={signUp} />
      )}
    </>
  );
};

export default Auth;
