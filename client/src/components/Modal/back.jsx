import React, { useEffect, useState } from "react";
import "./modal.css";
import { GrClose } from "react-icons/gr";
import { changeEditModal } from "../../features/editModalSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { addCoin, editCoin } from "../../features/coin/coinActions.js";

const CoinAdd = () => {
  const [data, setData] = useState({
    title: "",
    faceValue: "",
    year: "",
    price: "",
    country: "",
    metal: "",
    shortDesc: "",
    longDesc: "",
    quality: "",
    weight: "",
    imgObverse: "",
    imgReverse: "",
    category: "",
  });

  const {
    title,
    faceValue,
    year,
    price,
    country,
    metal,
    shortDesc,
    longDesc,
    quality,
    weight,
    imgObverse,
    imgReverse,
    category,
  } = data;

  const coin = useSelector((state) => state.coin.coin);
  const _id = useSelector((state) => state.coin.coin._id);

  const isEdit = useSelector((state) => state.coin.editCoin);
  const categories = useSelector((state) => state.category.categories);

  useEffect(() => {
    isEdit && setData(coin);
  }, [coin]);

  const dispatch = useDispatch();
  const onChangeFn = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const closeModal = () => {
    dispatch(changeEditModal(false));
  };

  const createCoin = (e) => {
    e.preventDefault();
    if (isEdit) {
      dispatch(
        editCoin({
          title,
          faceValue,
          year,
          price,
          country,
          metal,
          shortDesc,
          longDesc,
          quality,
          weight,
          imgObverse,
          imgReverse,
          category,
          _id,
        })
      );
    } else {
      dispatch(
        addCoin({
          title,
          faceValue,
          year,
          price,
          country,
          metal,
          shortDesc,
          longDesc,
          quality,
          weight,
          imgObverse,
          imgReverse,
          category,
        })
      );
    }
  };

  return (
    <div className="w-full h-screen bg-opacity-50 bg-black fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center">
      <div className="bg-white w-3/4 p-10 rounded-md">
        <div
          onClick={closeModal}
          className="flex justify-between items-center cursor-pointer"
        >
          <h3 className="font-bold text-2xl">ADD Coin</h3>
          <GrClose size={20} />
        </div>
        <div className="my-4 flex sm:flex-col lg:flex-row h-96">
          <div className="flex flex-col w-full mr-8 justify-between ">
            <input
              onChange={onChangeFn}
              name="title"
              value={data.title}
              type="text"
              placeholder="Coin Name"
              className="input-style"
            />
            <input
              onChange={onChangeFn}
              name="faceValue"
              value={data.faceValue}
              type="text"
              placeholder="Face value"
              className="input-style"
            />
            <input
              onChange={onChangeFn}
              name="year"
              value={data.year}
              type="text"
              placeholder="Year of issue"
              className="input-style"
            />
            <input
              onChange={onChangeFn}
              name="price"
              value={data.price}
              type="text"
              placeholder="Price"
              className="input-style"
            />
            <input
              onChange={onChangeFn}
              name="country"
              value={data.country}
              type="text"
              placeholder="Country"
              className="input-style"
            />
            <input
              onChange={onChangeFn}
              name="metal"
              value={data.metal}
              type="text"
              placeholder="Metal"
              className="input-style"
            />
          </div>
          <div className="flex flex-col justify-between w-full mr-8 ">
            <textarea
              onChange={onChangeFn}
              name="shortDesc"
              rows={2}
              value={data.shortDesc}
              placeholder="Short description"
              className="input-style"
            />
            <textarea
              onChange={onChangeFn}
              name="longDesc"
              value={data.longDesc}
              rows={4}
              placeholder="Long description"
              className="input-style"
            />
            <input
              onChange={onChangeFn}
              name="quality"
              value={data.quality}
              type="text"
              placeholder="Quality of the coin"
              className="input-style "
            />
            <input
              onChange={onChangeFn}
              name="weight"
              value={data.weight}
              type="text"
              placeholder="Weight"
              className="input-style"
            />
          </div>

          <div className="flex flex-col justify-between w-full">
            <div className="flex flex-col w-full">
              <input
                onChange={onChangeFn}
                name="imgObverse"
                value={data.imgObverse}
                type="text"
                placeholder="Link to obverse image"
                className="input-style mb-6"
              />
              <input
                onChange={onChangeFn}
                name="imgReverse"
                value={data.imgReverse}
                type="text"
                placeholder="Link to reverse image"
                className="input-style mb-6"
              />

              <select
                name="category"
                value={data.category}
                className="input-style"
                onChange={onChangeFn}
              >
                {data.category._id ? (
                  <option value={data.category._id}>
                    {data.category.title}
                  </option>
                ) : (
                  <option value="">Select Category</option>
                )}
                {categories?.map((category) => {
                  return (
                    <option key={category._id} value={category._id}>
                      {category.title}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex justify-around ">
              <div
                onClick={createCoin}
                className="border rounded-md border-violet-600 cursor-pointer text-sm py-4 px-12 hover:bg-violet-800 p-2 text-sm text-center bg-violet-600 text-white"
              >
                Save
              </div>
              <div
                onClick={closeModal}
                className="border rounded-md border-gray-500 cursor-pointer text-sm py-4 px-12 hover:bg-gray-700 p-2  text-sm text-center bg-gray-500 text-white"
              >
                Cancel
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinAdd;
