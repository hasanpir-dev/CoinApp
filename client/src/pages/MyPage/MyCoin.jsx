import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { changeEditModal } from "../../features/editModalSlice.js";
import { useDispatch, useSelector } from "react-redux";

import { getSingleCoin } from "../../features/coin/coinActions.js";
import { isEditCoin } from "../../features/coin/coinSlice.js";

const MyCoin = ({ title, shortDesc, imgObverse, _id }) => {
  const navigate = useNavigate();

  const API_URI = `http://localhost:4000/api/coins/`;

  const dispatch = useDispatch();

  const deleteCoinFromServer = async () => {
    let authToken = localStorage.getItem("userToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer: " + authToken,
      },
    };
    try {
      const res = await axios.delete(`${API_URI}${_id}/delete`, config);
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

  const [coin, setCoin] = useState([]);

  useEffect(() => {
    const getCoin = async () => {
      try {
        const fetchData = await axios.get(`${API_URI}${_id}`);
        setCoin(fetchData.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCoin();
  }, []);

  const editCoin = (e) => {
    dispatch(getSingleCoin(_id));
    dispatch(changeEditModal(true));
    dispatch(isEditCoin(true));
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
        <div
          onClick={(e) => editCoin(e)}
          className="cursor-pointer flex items-center justify-center h-12 w-32 text-center bg-gray-400 hover:bg-gray-500 text-white rounded mr-7"
        >
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
