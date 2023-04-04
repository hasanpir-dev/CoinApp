import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../../components/Spinner/Spinner.jsx";
import "./CoinPage.css";

const CoinPage = () => {
  const params = useParams();
  const category_id = params._id;
  const coin_id = params.id;

  const API_URI = `http://localhost:4000/api/category/${category_id}/coins/${coin_id}`;
  const [coin, setCoin] = useState([]);

  useEffect(() => {
    const getCoin = async () => {
      try {
        const fetchData = await axios.get(API_URI);
        setCoin(fetchData.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCoin();
  }, []);

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
          <div className="bg-gray-200 px-10 py-5">
            <h2 className="font-bold text-2xl mb-4">{coin.data.title}</h2>
            <h5 className="text-xs  w-96 mb-3">{coin.data.shortDesc}</h5>
            <p className="text-xs mb-10  w-96">{coin.data.longDesc}</p>
            <div>
              <table className="text-xs  w-96">
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
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default CoinPage;
