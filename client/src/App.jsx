import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home.jsx";
import ProfileHeader from "./components/Header/ProfileHeader.jsx";
import Header from "./components/Header/Header.jsx";
import Modal from "./components/Modal/Modal.jsx";
import { useSelector } from "react-redux";

import CategoryModal from "./components/Modal/Category.jsx";
import Login from "./components/Auth/Login.jsx";
import Register from "./components/Auth/Register.jsx";
import CoinListPage from "./pages/Coinlist/CoinListPage.jsx";
import CoinPage from "./pages/Coin/CoinPage.jsx";

function App() {
  const { editModal, categoryModal } = useSelector((state) => state.modal);
  const { signInModal, signUpModal } = useSelector((state) => state.auth);

  return (
    <>
      <Header />

      {signInModal && <Login />}
      {signUpModal && <Register />}
      {editModal && <Modal />}
      {categoryModal && <CategoryModal />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/user-profile"
          element={
            <RouteControl>
              <ProfileHeader />
            </RouteControl>
          }
        />
        <Route path="/coins/:coin_id" element={<CoinPage />} />
        <Route path="/coins/" element={<CoinListPage />} />
        <Route path="/category/:_id" element={<CoinListPage />} />
        <Route path="/*" element={<h1>404 Not Found</h1>}></Route>
      </Routes>
    </>
  );
}

export default App;

export const RouteControl = ({ children }) => {
  if (localStorage.getItem("name")) {
    return children;
  } else {
    return <Navigate to="/auth" />;
  }
};
