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
  const { categories } = useSelector((state) => state.category);
  const category = categories.find((category) => category._id === id);

  //flex items-center flex-wrap
  //flex flex-col items-center justify-center
  return (
    <>
      <div className="p-12 container lg:mx-auto">
        <Serach />
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-2xl font-medium py-5">{category?.title}</h3>
          <p className="indent-6 ">{category?.description}</p>
        </div>
        <div className="grid lg:grid-cols-2 py-12">
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
