import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../../components/Spinner/Spinner.jsx";
import "./CoinPage.css";
import { IoMdHeart, IoMdHeartDislike } from "react-icons/io";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import isLiked from "../../utilities/isLiked.js";
import getApiUrl from "../../utilities/getApiUrl.js";

const CoinPage = () => {
  const params = useParams();
  const authorized = useSelector((state) => state.auth.authorized);
  const coin_id = params.coin_id;
  const API_URI = getApiUrl() + `/api/coins/${coin_id}`;
  const user_id = useSelector((state) => state.auth.user_id);
  const navigate = useNavigate();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const authToken = useSelector((state) => state.auth.userToken);

  useEffect(() => {
    const getCoin = async () => {
      try {
        const { data } = await axios.get(API_URI);
        setCoin(data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getCoin();
  }, []);

  const like = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer: " + authToken,
        },
      };
      await axios.get(`${API_URI}/like`, config);
      toast.info("You have liked successfully.", {
        position: "top-left",
      });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
      setCoin({ ...coin, likeCount: (coin.likeCount += 1) });
      setCoin({ ...coin, likes: [...coin.likes, user_id] });
    }
  };
  const undo_like = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer: " + authToken,
        },
      };
      await axios.get(`${API_URI}/undo_like`, config);
      toast.info("You have unliked successfully.", {
        position: "top-left",
      });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
      setCoin({ ...coin, likeCount: (coin.likeCount -= 1) });
      setCoin({
        ...coin,
        likes: coin.likes.filter((like) => like !== user_id),
      });
    }
  };

  if (error) {
    //
    return (
      <div className="flex flex-col justify-center items-center py-12">
        <h2 className="text-2xl font-bold mb-4">{error.message}</h2>
        <button
          className="bg-violet-500 hover:bg-violet-700 transition-all text-white py-3 px-6 rounded-lg"
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

  const userLiked = isLiked(user_id, coin.likes);

  return (
    <>
      {coin ? (
        <div className="flex justify-center py-12 xs:flex-col md:flex-row container mx-auto">
          <div className="flex px-7 xs:flex-row md:flex-col">
            <div
              className="flex mb-7"
              style={{
                width: "18.75rem",
                height: "18.75rem",
              }}
            >
              <img src={coin.imgObverse} alt="coin" />
            </div>
            <div
              className="flex"
              style={{
                width: "18.75rem",
                height: "18.75rem",
              }}
            >
              <img src={coin.imgReverse} alt="" />
            </div>
          </div>
          <div className="bg-gray-200 px-10 py-5 flex flex-col items-start">
            <h2 className="font-bold text-2xl mb-4">{coin.title}</h2>
            <h5 className="text-xs mb-3 md:w-96">{coin.shortDesc}</h5>
            <p className="text-xs mb-10 md:w-96">{coin.longDesc}</p>
            <div className="mb-4">
              <table className="text-xs md:w-96">
                <tbody>
                  <tr>
                    <td>Issuing Country</td>
                    <td>{coin.country}</td>
                  </tr>
                  <tr>
                    <td>Composition</td>
                    <td>{coin.metal}</td>
                  </tr>
                  <tr>
                    <td>Quality</td>
                    <td>{coin.quality}</td>
                  </tr>
                  <tr>
                    <td>Denomination</td>
                    <td>{coin.faceValue}</td>
                  </tr>
                  <tr>
                    <td>Year</td>
                    <td>{coin.year}</td>
                  </tr>
                  <tr>
                    <td>Weight</td>
                    <td>{coin.weight}</td>
                  </tr>
                  <tr>
                    <td>Price</td>
                    <td>{coin.price} $</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex items-center">
              {authorized && (
                <>
                  {userLiked ? (
                    <IoMdHeartDislike
                      onClick={undo_like}
                      size={50}
                      className="transition-all cursor-pointer hover:text-violet-700"
                    />
                  ) : (
                    <IoMdHeart
                      onClick={like}
                      size={50}
                      color={"#7C3AED"}
                      className="cursor-pointer"
                    />
                  )}
                </>
              )}
              {coin.likeCount} likes
            </div>
            <span
              onClick={() => navigate(-1)}
              className="text-xs underline transition-all hover:no-underline mt-auto cursor-pointer"
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
