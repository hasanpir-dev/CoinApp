import Coin from "../../components/Coinlist/Coin/Coin.jsx";
import { useEffect } from "react";
import { getCoins } from "../../futures/coin/coinActions.js";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner.jsx";
import Serach from "../../components/Search/Serach.jsx";

const CoinListPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const id = params._id;

  const coins = useSelector((state) => state.coin.coins);
  const loading = useSelector((state) => state.coin.loading);

  useEffect(() => {
    dispatch(getCoins(id));
  }, [dispatch]);

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
