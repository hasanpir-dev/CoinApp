import React from "react";
import { useNavigate } from "react-router-dom";

const Coin = ({ title, shortDesc, imgObverse, _id, likeCount }) => {
  const navigate = useNavigate();

  //flex w-6/12
  return (
    <div className="flex mb-6">
      <div
        style={{ width: "120px", height: "120px" }}
        className="cursor-pointer mr-7"
        onClick={() => navigate(`/coins/${_id}`)}
      >
        <img src={imgObverse} alt={title} />
      </div>
      <div className="w-8/12">
        <h3 className="font-bold text-base text-violet-600 mb-1">{title}</h3>
        <p className="text-xs break-all">{shortDesc}</p>
      </div>
      <div className="">
        <span className="font-bold text-violet-600">{likeCount}</span> likes
      </div>
    </div>
  );
};

export default Coin;
