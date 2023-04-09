import Coin from "../../components/Coin/Coin.jsx";

import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner.jsx";
import Serach from "../../components/Search/Serach.jsx";
import { useEffect, useState } from "react";

const CoinListPage = () => {
  const params = useParams();
  const id = params._id;

  const coinsByCategorySate = useSelector((state) => state.coin.coins);
  const alLCoinsState = useSelector((state) => state.coin.allCoins);
  const loading = useSelector((state) => state.coin.loading);
  const coins = id ? coinsByCategorySate : alLCoinsState;
  const [searchParams] = useSearchParams();

  const filterData = useSelector((state) => state.coin.filterCoins);

  console.log(filterData);

  return (
    <>
      <div className="p-12 w-[1280px] m-auto">
        <Serach />
        <div className="flex items-center py-12 flex-wrap">
          {loading ? (
            <Spinner />
          ) : (
            coins?.map((coin) => {
              return <Coin key={coin._id} {...coin} id={id} />;
            })
          )}
        </div>
      </div>
    </>
  );
};

export default CoinListPage;
