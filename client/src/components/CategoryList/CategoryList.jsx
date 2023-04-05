import React, { useEffect } from "react";
import Category from "./Category.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../features/category/categoryActions.js";
import Spinner from "../Spinner/Spinner.jsx";

const CategoryList = () => {
  const categories = useSelector((state) => state.category.categories);

  const dispatch = useDispatch();

  const title = useSelector((state) => state.category.title);

  useEffect(() => {
    dispatch(getCategories({ title }));
  }, [dispatch, title]);

  return (
    <div className="flex items-center py-12 flex-wrap">
      {categories.length !== 0 ? (
        categories?.map((category) => {
          return <Category key={category._id} {...category} />;
        })
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default CategoryList;
