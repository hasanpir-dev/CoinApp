import React from "react";
import CategoryList from "../../components/CategoryList/CategoryList.jsx";
import Serach from "../../components/Search/Serach.jsx";

const Home = () => {
  return (
    <div className="p-12 container mx-auto">
      <Serach />
      <CategoryList />
    </div>
  );
};

export default Home;
