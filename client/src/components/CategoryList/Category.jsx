import React, { useEffect } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { changeCoinListModal } from "../../features/editModalSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { getCoins } from "../../features/coin/coinActions.js";
import { Link, useNavigate } from "react-router-dom";

const Category = ({ title, image, _id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openCoinList = () => {
    navigate(`/coins/${_id}`);
    // dispatch(changeCoinListModal(true));
  };

  return (
    <>
      <div className="mr-36 mb-10">
        <h2 className="text-3xl text-gray-700  mb-5 font-medium">{title}</h2>
        <div className="flex items-center mb-3 w-fit">
          <Link
            className="text-sm font-light cursor-pointer"
            to={`/coins/${_id}`}
          >
            Show All
          </Link>
          <MdKeyboardArrowRight size={20} className="cursor-pointer" />
        </div>
        <div
          onClick={openCoinList}
          className="cursor-pointer rounded-b-full"
          style={{ width: "214px", height: "214px" }}
        >
          <img src={image} alt={title} className="w-fit" />
        </div>
      </div>
    </>
  );
};

export default Category;
