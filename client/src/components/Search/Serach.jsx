import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import Filter from "../Filter/Filter.jsx";
import { useDispatch, useSelector } from "react-redux";
import { changeFilterModal } from "../../features/editModalSlice.js";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getAllCoins, getCoins } from "../../features/coin/coinActions.js";
import { filterCoin } from "../../features/coin/coinSlice.js";

const Search = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const filterData = useSelector((state) => state.coin.filterCoins);
  const params = useParams();
  const id = params._id;
  const location = useLocation();

  const { filterModal } = useSelector((state) => state.modal);
  const openFilter = () => {
    dispatch(changeFilterModal(true));
  };
  const closeFilter = () => {
    dispatch(changeFilterModal(false));
  };

  useEffect(() => {
    location.pathname === "/coins/" && dispatch(getAllCoins({ ...filterData }));
    id && dispatch(getCoins({ id, ...filterData }));
  }, [dispatch, filterData]);

  useEffect(() => {
    dispatch(filterCoin({ title }));
  }, [title]);

  console.log(location.pathname === "/coins/");
  const navigate = useNavigate();

  return (
    <>
      <div className="w-6/12">
        <div>
          <h1 className="text-5xl text-gray-700 font-bold">Coin Social App</h1>
        </div>
        <div className="flex flex-col mb-2.5">
          <label className="text-sm font-medium my-1.5">Search</label>
          <div className="max-w-lg flex justify-between">
            <input
              className="border rounded-md outline-none text-sm p-4 w-full mr-7"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            {location.pathname === "/coins/" ? (
              <button
                onClick={() => {
                  navigate("/");
                }}
                className="border rounded-md border-violet-600 w-48 cursor-pointer text-sm py-4 px-9 hover:bg-violet-800 text-center bg-violet-600 text-white"
              >
                Categories
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate("/coins/");
                }}
                className="border rounded-md border-violet-600 w-48 cursor-pointer text-sm py-4 px-9 hover:bg-violet-800 text-center bg-violet-600 text-white"
              >
                All Coins
              </button>
            )}
          </div>
        </div>
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
        {filterModal && <Filter />}
      </div>
    </>
  );
};

export default Search;
