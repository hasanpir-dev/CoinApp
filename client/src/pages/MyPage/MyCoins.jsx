import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner.jsx";
import Serach from "../../components/Search/Serach.jsx";
import MyCoin from "./MyCoin.jsx";
import filterItems from "../../utilities/filterİtems.js";

const MyCoinPage = () => {
  const params = useParams();
  const id = params._id;

  const loading = useSelector((state) => state.coin.loading);
  const filtercoins = useSelector((state) => state.coin.filterCoins);
  const myCoins = useSelector((state) => state.coin.myCoins);

  const filteredItems = filterItems(myCoins, filtercoins);

  return (
    <>
      <div className="p-12 container lg:mx-auto">
        <Serach />
        <div className="flex flex-col py-12 ">
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
