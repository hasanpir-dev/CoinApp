import React from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import Filter from "../Filter/Filter.jsx";
import { useDispatch, useSelector } from "react-redux";
import { changeFilterModal } from "../../futures/editModalSlice.js";

const Search = () => {
  const dispatch = useDispatch();
  const { filterModal } = useSelector((state) => state.modal);
  const openFilter = () => {
    dispatch(changeFilterModal(true));
  };
  const closeFilter = () => {
    dispatch(changeFilterModal(false));
  };

  return (
    <>
      <div>
        <div>
          <h1 className="text-5xl text-gray-700 font-bold">
            Coin Social Media
          </h1>
        </div>
        <div className="flex flex-col mb-2.5">
          <label className="text-sm font-medium my-1.5">Search</label>
          <div className="max-w-lg flex justify-between">
            <input className="border rounded-md outline-none text-sm p-4 w-full mr-7" />
            <button className="border rounded-md border-violet-600 cursor-pointer text-sm py-4 px-9 hover:bg-violet-800 p-2 text-center bg-violet-600 text-white">
              Search
            </button>
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
