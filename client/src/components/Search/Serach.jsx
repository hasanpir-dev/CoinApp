import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import Filter from "../Filter/Filter.jsx";
import { useDispatch, useSelector } from "react-redux";
import { changeFilterModal } from "../../features/editModalSlice.js";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getAllCoins,
  getCoins,
  getUserCoins,
} from "../../features/coin/coinActions.js";
import { filterCoin } from "../../features/coin/coinSlice.js";
import { categorySearch } from "../../features/category/categorySlice.js";

const Search = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const filterData = useSelector((state) => state.coin.filterCoins);
  const authorized = useSelector((state) => state.auth.authorized);
  const params = useParams();
  const id = params._id;
  const location = useLocation();
  const user_id = useSelector((state) => state.auth.user_id);
  const userName = useSelector((state) => state.auth.name);

  const { filterModal } = useSelector((state) => state.modal);

  const navigate = useNavigate();
  const openFilter = () => {
    dispatch(changeFilterModal(true));
  };
  const closeFilter = () => {
    dispatch(changeFilterModal(false));
  };

  useEffect(() => {
    location.pathname === "/coins" && dispatch(getAllCoins({ ...filterData }));
    location.pathname === "/my_coins" && dispatch(getUserCoins({ user_id }));
    id && dispatch(getCoins({ id, ...filterData }));
  }, [dispatch, filterData]);

  useEffect(() => {
    location.pathname === "/"
      ? dispatch(categorySearch(title))
      : dispatch(filterCoin({ title }));
  }, [dispatch, title]);

  return (
    <>
      <div className="">
        <div>
          <h1 className="text-4xl md:text-5xl text-gray-700 font-bold">
            Coin Social App
          </h1>
        </div>
        <div className="flex flex-col mb-2.5">
          <label className="text-sm font-medium my-1.5">Search</label>
          <div
            className={`flex justify-between ${
              authorized ? "lg:w-8/12" : "lg:w-6/12"
            }`}
          >
            <input
              className="border rounded-md outline-none text-sm p-4 w-full max-w-sm mr-7"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            {location.pathname === "/coins" ? (
              <button
                onClick={() => {
                  navigate("/");
                }}
                className="border rounded-md border-violet-600 w-36 transition-all cursor-pointer text-sm py-4 px-9 hover:bg-violet-800 text-center bg-violet-600 text-white"
              >
                Categories
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate("/coins");
                }}
                className="border rounded-md border-violet-600 w-36 transition-all cursor-pointer text-sm py-4 px-9 hover:bg-violet-800 text-center bg-violet-600 text-white"
              >
                All Coins
              </button>
            )}
            {authorized && (
              <button
                onClick={() => {
                  navigate("/my_coins");
                }}
                className="border rounded-md border-violet-600 w-36 transition-all cursor-pointer text-sm py-4 hover:bg-violet-800 text-center bg-violet-600 text-white"
              >
                {userName} Coins
              </button>
            )}
          </div>
        </div>
        {location.pathname === "/" ? null : (
          <div
            className="flex items-center w-fit "
            onClick={!filterModal ? openFilter : closeFilter}
          >
            <span className="text-sm underline font-light cursor-pointer">
              Advanced filter
            </span>
            {!filterModal ? (
              <MdKeyboardArrowDown size={20} className="cursor-pointer" />
            ) : (
              <MdKeyboardArrowUp size={20} className="cursor-pointer" />
            )}
          </div>
        )}
        {location.pathname !== "/" && filterModal && <Filter />}
      </div>
    </>
  );
};

export default Search;
