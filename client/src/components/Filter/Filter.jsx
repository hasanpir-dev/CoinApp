import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { filterCoin } from "../../features/coin/coinSlice.js";

const Filter = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    country: "",
    metal: "",
    quality: "",
    priceFrom: "",
    priceTo: "",
    yearFrom: "",
    yearTo: "",
  });

  const onChangeFn = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(filterCoin(data));
  }, [data]);

  //coins?title=name&year=2000,2010&price=500,1000&country=country&metal=gold&quality=gold

  return (
    <div className="flex items-center">
      <div className="bg-white w-3/4 py-6 rounded-md">
        <div className="my-4 flex flex-col lg:flex-row h-48">
          <div className="flex flex-col w-96 mr-16">
            <input
              onChange={onChangeFn}
              name="country"
              value={data.country}
              type="text"
              placeholder="Country"
              className="input-style mb-6"
            />
            <input
              onChange={onChangeFn}
              name="metal"
              value={data.metal}
              type="text"
              placeholder="Metal"
              className="input-style mb-6"
            />
            <input
              onChange={onChangeFn}
              name="quality"
              value={data.quality}
              type="text"
              placeholder="Quality"
              className="input-style"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex">
              <input
                onChange={onChangeFn}
                name="priceFrom"
                value={data.priceFrom}
                type="text"
                placeholder="Price from"
                className="input-style mb-6 mr-9"
              />
              <input
                onChange={onChangeFn}
                name="priceTo"
                value={data.priceTo}
                type="text"
                placeholder="Price to"
                className="input-style mb-6"
              />
            </div>
            <div className="flex">
              <input
                onChange={onChangeFn}
                name="yearFrom"
                value={data.yearFrom}
                type="text"
                placeholder="Year from"
                className="input-style mb-6 mr-9"
              />
              <input
                onChange={onChangeFn}
                name="yearTo"
                value={data.yearTo}
                type="text"
                placeholder="Year to"
                className="input-style mb-6"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
