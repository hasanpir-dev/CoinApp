import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner.jsx";
import Serach from "../../components/Search/Serach.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import MyCoin from "./MyCoin.jsx";
import { toast } from "react-toastify";
import filterItems from "../../utilities/filterİtems.js";

const MyCoinPage = () => {
  const params = useParams();
  const id = params._id;

  const loading = useSelector((state) => state.coin.loading);
  const filtercoins = useSelector((state) => state.coin.filterCoins);

  const [myCoins, setMyCoins] = useState([]);

  //`${backendURL}/api/coins?title=${title}&year=${yearFrom},${yearTo}&price=${priceFrom},${priceTo}&country=${country}&metal=${metal}&quality=${quality}`
  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    const API_URI = `http://localhost:4000/api/users/${user_id}/coins/`;
    const getCoin = async () => {
      try {
        const fetchData = await axios.get(API_URI);
        setMyCoins(fetchData.data.data);
      } catch (error) {
        toast.error("Something went wrong", {
          position: "top-left",
        });
      }
    };

    getCoin();
  }, []);

  const filteredItems = filterItems(myCoins, filtercoins);

  return (
    <>
      <div className="p-12 w-[1280px] m-auto">
        <Serach />
        <div className="flex  flex-col py-12 ">
          {loading ? (
            <Spinner />
          ) : (
            filteredItems?.map((coin) => {
              return <MyCoin key={coin._id} {...coin} id={id} />;
            })
          )}
        </div>
      </div>
    </>
  );
};

export default MyCoinPage;
