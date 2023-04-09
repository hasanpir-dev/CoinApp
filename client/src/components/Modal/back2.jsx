import React, { useEffect, useState } from "react";
import "./modal.css";
import { GrClose } from "react-icons/gr";
import { changeEditModal } from "../../features/editModalSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { addCoin, editCoin } from "../../features/coin/coinActions.js";
import { useFormik } from "formik";
import { coinSchema } from "../../schemas/index.js";

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

  const [initialValues, setInitialValues] = useState(data);
  useEffect(() => {
    isEdit && setData(coin);
    isEdit && setInitialValues(coin);
  }, [coin]);
  console.log(initialValues);

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(changeEditModal(false));
  };

  const onSubmit = (e) => {
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

  useEffect(() => {
    if (isEdit) {
      setInitialValues(data);
    }
  }, [data, isEdit]);

  let {
    values = { ...initialValues },
    errors,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: { ...initialValues },
    validationSchema: coinSchema,
    onSubmit: onSubmit,
  });
  console.log(initialValues);

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
        <form
          onSubmit={handleSubmit}
          className="my-4 flex sm:flex-col lg:flex-row
        h-96"
        >
          <div className="flex flex-col w-full mr-8 justify-between ">
            <input
              name="title"
              value={values.title}
              type="text"
              placeholder="Coin Name"
              onChange={handleChange}
              className="input-style"
            />
            <input
              onChange={handleChange}
              name="faceValue"
              value={values.faceValue}
              type="text"
              placeholder="Face value"
              className="input-style"
            />
            <input
              onChange={handleChange}
              name="year"
              value={values.year}
              type="text"
              placeholder="Year of issue"
              className="input-style"
            />
            <input
              onChange={handleChange}
              name="price"
              value={values.price}
              type="text"
              placeholder="Price"
              className="input-style"
            />
            <input
              onChange={handleChange}
              name="country"
              value={values.country}
              type="text"
              placeholder="Country"
              className="input-style"
            />
            <input
              onChange={handleChange}
              name="metal"
              value={values.metal}
              type="text"
              placeholder="Metal"
              className="input-style"
            />
          </div>
          <div className="flex flex-col justify-between w-full mr-8 ">
            <textarea
              onChange={handleChange}
              name="shortDesc"
              rows={2}
              value={values.shortDesc}
              placeholder="Short description"
              className="input-style"
            />
            <textarea
              onChange={handleChange}
              name="longDesc"
              value={values.longDesc}
              rows={4}
              placeholder="Long description"
              className="input-style"
            />
            <input
              onChange={handleChange}
              name="quality"
              value={values.quality}
              type="text"
              placeholder="Quality of the coin"
              className="input-style "
            />
            <input
              onChange={handleChange}
              name="weight"
              value={values.weight}
              type="text"
              placeholder="Weight"
              className="input-style"
            />
          </div>
          <div className="flex flex-col justify-between w-full">
            <div className="flex flex-col w-full">
              <input
                onChange={handleChange}
                name="imgObverse"
                value={values.imgObverse}
                type="text"
                placeholder="Link to obverse image"
                className="input-style mb-6"
              />
              <input
                onChange={handleChange}
                name="imgReverse"
                value={values.imgReverse}
                type="text"
                placeholder="Link to reverse image"
                className="input-style mb-6"
              />

              <select
                name="category"
                value={values.category}
                className="input-style"
                onChange={handleChange}
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
              <button
                type="submit"
                className="border rounded-md border-violet-600 cursor-pointer text-sm py-4 px-12 hover:bg-violet-800 p-2 text-sm text-center bg-violet-600 text-white"
              >
                Save
              </button>
              <div
                onClick={closeModal}
                className="border rounded-md border-gray-500 cursor-pointer text-sm py-4 px-12 hover:bg-gray-700 p-2  text-sm text-center bg-gray-500 text-white"
              >
                Cancel
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CoinAdd;
