import Coin from "../../components/Coin/Coin.jsx";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner.jsx";
import Serach from "../../components/Search/Serach.jsx";

const CoinListPage = () => {
  const params = useParams();
  const id = params._id;

  const coinsByCategorySate = useSelector((state) => state.coin.coins);
  const alLCoinsState = useSelector((state) => state.coin.allCoins);
  const loading = useSelector((state) => state.coin.loading);
  const coins = id ? coinsByCategorySate : alLCoinsState;

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
