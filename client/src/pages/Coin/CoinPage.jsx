import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../../components/Spinner/Spinner.jsx";
import "./CoinPage.css";
import { IoMdHeart, IoMdHeartDislike } from "react-icons/io";

import { useSelector } from "react-redux";

const isLiked = (user_id, likes) => {
  console.log(user_id, likes);
  likes.some((like) => like === user_id);
};

const CoinPage = () => {
  const params = useParams();
  const coin_id = params.coin_id;
  const API_URI = `http://localhost:4000/api/coins/${coin_id}`;
  const user_id = useSelector((state) => state.auth.user_id);
  const navigate = useNavigate();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getCoin = async () => {
      try {
        const fetchData = await axios.get(API_URI);
        setCoin(fetchData.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getCoin();
  }, []);

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center py-12">
        <h2 className="text-2xl font-bold mb-4">Coin is not found.</h2>
        <button
          className="bg-violet-500 hover:bg-violet-700 text-white py-3 px-6 rounded-lg"
          onClick={() => navigate(-1)}
        >
          Go back
        </button>
      </div>
    );
  }

  if (loading) {
    return <Spinner />;
  }

  console.log(isLiked(user_id, coin.data.likes));

  return (
    <>
      {coin.data ? (
        <div className="flex justify-center py-12 w-[1280px] m-auto">
          <div className="px-7">
            <div
              className="mb-7"
              style={{
                width: "300px",
                height: "300px",
              }}
            >
              <img src={coin.data.imgObverse} alt="coin" />
            </div>
            <div
              style={{
                width: "300px",
                height: "300px",
              }}
            >
              <img src={coin.data.imgReverse} alt="" />
            </div>
          </div>
          <div className="bg-gray-200 px-10 py-5 flex flex-col items-start">
            <h2 className="font-bold text-2xl mb-4">{coin.data.title}</h2>
            <h5 className="text-xs w-96 mb-3">{coin.data.shortDesc}</h5>
            <p className="text-xs mb-10 w-96">{coin.data.longDesc}</p>
            <div className="mb-4">
              <table className="text-xs w-96">
                <tbody>
                  <tr>
                    <td>Issuing Country</td>
                    <td>{coin.data.country}</td>
                  </tr>
                  <tr>
                    <td>Composition</td>
                    <td>{coin.data.metal}</td>
                  </tr>
                  <tr>
                    <td>Quality</td>
                    <td>{coin.data.quality}</td>
                  </tr>
                  <tr>
                    <td>Denomination</td>
                    <td>{coin.data.faceValue}</td>
                  </tr>
                  <tr>
                    <td>Year</td>
                    <td>{coin.data.year}</td>
                  </tr>
                  <tr>
                    <td>Weight</td>
                    <td>{coin.data.weight}</td>
                  </tr>
                  <tr>
                    <td>Price</td>
                    <td>{coin.data.price} $</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex items-center">
              <IoMdHeart size={50} color={"#7C3AED"} />{" "}
              <IoMdHeartDislike size={50} /> {coin.data.likeCount} - liked this
              coin
            </div>
            <span
              onClick={() => navigate(-1)}
              className="text-xs underline hover:no-underline mt-auto cursor-pointer"
            >
              Back to the list
            </span>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default CoinPage;
