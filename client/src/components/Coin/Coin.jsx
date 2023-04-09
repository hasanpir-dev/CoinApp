import React from "react";
import { useNavigate } from "react-router-dom";

const Coin = ({ title, shortDesc, imgObverse, _id, likeCount }) => {
  const navigate = useNavigate();

  return (
    <div className="flex w-6/12 mb-6">
      <div
        style={{ width: "120px", height: "120px" }}
        className="cursor-pointer mr-7"
        onClick={() => navigate(`/coins/${_id}`)}
      >
        <img src={imgObverse} alt={title} />
      </div>
      <div className="w-80">
        <h3 className="font-bold text-base text-violet-600 mb-1">{title}</h3>
        <p className="text-xs break-all">{shortDesc}</p>
      </div>
      <div className="">{likeCount} likes</div>
    </div>
  );
};

export default Coin;
