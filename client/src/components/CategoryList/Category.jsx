import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const Category = ({ title, image, _id }) => {
  const navigate = useNavigate();

  const openCoinList = () => {
    navigate(`/category/${_id}`);
  };

  //w-4/12
  return (
    <>
      <div className="mb-28">
        <h2 className="text-3xl text-gray-700  mb-5 font-medium break-words">
          {title}
        </h2>
        <div className="flex items-center mb-3 w-fit">
          <Link
            className="text-sm font-light cursor-pointer"
            to={`/category/${_id}`}
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
