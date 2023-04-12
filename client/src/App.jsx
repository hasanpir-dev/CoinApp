import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home.jsx";
import ProfileHeader from "./components/Header/ProfileHeader.jsx";
import Header from "./components/Header/Header.jsx";
import CoinAdd from "./components/Modal/CoinAdd.jsx";
import { useSelector } from "react-redux";

import CategoryModal from "./components/Modal/Category.jsx";
import Login from "./components/Auth/Login.jsx";
import Register from "./components/Auth/Register.jsx";
import CoinListPage from "./pages/CoinList/CoinListPage.jsx";
import CoinPage from "./pages/Coin/CoinPage.jsx";
import MyCoins from "./pages/MyPage/MyCoins.jsx";
import NotFoundPage from "./pages/404.jsx";
import getApiUrl from "./utilities/getApiUrl.js";

function App() {
  const { editModal, categoryModal } = useSelector((state) => state.modal);
  const { signInModal, signUpModal } = useSelector((state) => state.auth);

  return (
    <>
      <Header />

      {signInModal && <Login />}
      {signUpModal && <Register />}
      {editModal && <CoinAdd />}
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
        <Route
          exat
          path="/my_coins"
          element={
            <RouteControl>
              <MyCoins />
            </RouteControl>
          }
        />
        <Route path="/coins/:coin_id" element={<CoinPage />} />
        <Route exat path="/coins" element={<CoinListPage />} />
        <Route path="/category/:_id" element={<CoinListPage />} />
        <Route path="/*" element={<NotFoundPage />}></Route>
      </Routes>
    </>
  );
}

export default App;

// export const RouteControl = ({ children }) => {
//   if (localStorage.getItem("name")) {
//     return children;
//   } else {
//     return <Navigate to="/" />;
//   }
// };

export const RouteControl = ({ children }) => {
  const authorized = useSelector((state) => state.auth.authorized);
  if (authorized) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};
