import Category from "./Category.jsx";
import { useSelector } from "react-redux";

import Spinner from "../Spinner/Spinner.jsx";

const CategoryList = () => {
  const categories = useSelector((state) => state.category.categories);

  //flex items-center py-12 flex-wrap

  return (
    <>
      {categories.length !== 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 place-content-center py-12">
          {categories?.map((category) => {
            return <Category key={category._id} {...category} />;
          })}
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default CategoryList;
