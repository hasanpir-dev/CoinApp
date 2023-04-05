import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const MyCoin = ({ title, shortDesc, imgObverse, _id }) => {
  const navigate = useNavigate();

  console.log(_id);
  const API_URI = `http://localhost:4000/api/coins/${_id}/delete`;

  const deleteCoinFromServer = async () => {
    let authToken = localStorage.getItem("userToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer: " + authToken,
      },
    };
    try {
      const res = await axios.delete(`${API_URI}`, config);
      toast.success("You delete coin successfully.", {
        position: "top-left",
      });
    } catch (error) {
      alert(error.message);
    }
  };
  const deleteCoin = () => {
    if (window.confirm("Are you sure you want to delete this coin?")) {
      deleteCoinFromServer();
    }
  };
  return (
    <div className="flex mb-6">
      <div className="flex mb-6 w-8/12">
        <div
          style={{ width: "120px", height: "120px" }}
          className="cursor-pointer mr-7"
          onClick={() => navigate(`/coins/${_id}`)}
        >
          <img src={imgObverse} alt={title} />
        </div>
        <div className="w-full">
          <h3 className="font-bold text-base text-violet-600 mb-1">{title}</h3>
          <p className="text-xs w-auto break-words">{shortDesc}</p>
        </div>
      </div>
      <div className="flex mb-6">
        <div className="cursor-pointer flex items-center justify-center h-12 w-32 text-center bg-gray-400 hover:bg-gray-500 text-white rounded mr-7">
          Edit
        </div>
        <div
          onClick={deleteCoin}
          className="cursor-pointer flex items-center justify-center h-12 w-32 text-center bg-gray-400 hover:bg-gray-600 text-white rounded"
        >
          Delete
        </div>
      </div>
    </div>
  );
};

export default MyCoin;
