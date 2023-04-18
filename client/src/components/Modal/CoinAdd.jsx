import React, { useEffect, useState } from "react";
import "./modal.css";
import { GrClose } from "react-icons/gr";
import { changeEditModal } from "../../features/editModalSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { addCoin, editCoin } from "../../features/coin/coinActions.js";
import { useFormik } from "formik";
import { coinSchema } from "../../schemas/index.js";
import "../../components/Auth/auth.css";

const CoinAdd = () => {
  const editMyCoin = useSelector((state) => state.coin.editMyCoin);
  const isEdit = useSelector((state) => state.coin.editCoin);
  const categories = useSelector((state) => state.category.categories);
  const { editModal } = useSelector((state) => state.modal);

  const [initialValues, setInitialValues] = useState({
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
  useEffect(() => {
    isEdit && setInitialValues(editMyCoin);
  }, [editMyCoin, editModal]);

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(changeEditModal(false));
  };

  const onSubmit = (values) => {
    if (isEdit) {
      {
        dispatch(
          editCoin({
            ...values,
          })
        );
      }
    } else {
      dispatch(
        addCoin({
          ...values,
        })
      );
    }
    dispatch(changeEditModal(false));
  };

  const formik = useFormik({
    initialValues: {
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
    },
    validationSchema: coinSchema,
    onSubmit,
  });

  const { values, errors, handleChange, handleSubmit } = formik;

  useEffect(() => {
    if (editModal) {
      formik.setValues(initialValues);
    }
  }, [editModal, initialValues]);

  return (
    <div className="w-full h-screen bg-opacity-50 bg-black fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center">
      <div className="bg-white w-[100%] md:w-3/4 lg:h-auto p-10 rounded-md">
        <div
          onClick={closeModal}
          className="flex justify-between items-center cursor-pointer"
        >
          <h3 className="font-bold text-2xl">ADD Coin</h3>
          <GrClose size={20} />
        </div>
        <form
          onSubmit={handleSubmit}
          className="my-4 flex xs:flex-col lg:flex-row
        h-96 overflow-y-scroll"
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
            {errors.title && (
              <span className="error-message">{errors.title}</span>
            )}
            <input
              onChange={handleChange}
              name="faceValue"
              value={values.faceValue}
              type="text"
              placeholder="Face value"
              className="input-style"
            />
            {errors.faceValue && (
              <span className="error-message">{errors.faceValue}</span>
            )}
            <input
              onChange={handleChange}
              name="year"
              value={values.year}
              type="text"
              placeholder="Year of issue"
              className="input-style"
            />
            {errors.year && (
              <span className="error-message">{errors.year}</span>
            )}
            <input
              onChange={handleChange}
              name="price"
              value={values.price}
              type="text"
              placeholder="Price"
              className="input-style"
            />
            {errors.price && (
              <span className="error-message">{errors.price}</span>
            )}
            <input
              onChange={handleChange}
              name="country"
              value={values.country}
              type="text"
              placeholder="Country"
              className="input-style"
            />
            {errors.country && (
              <span className="error-message">{errors.country}</span>
            )}
            <input
              onChange={handleChange}
              name="metal"
              value={values.metal}
              type="text"
              placeholder="Metal"
              className="input-style"
            />
            {errors.metal && (
              <span className="error-message">{errors.metal}</span>
            )}
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
            {errors.shortDesc && (
              <span className="error-message">{errors.shortDesc}</span>
            )}
            <textarea
              onChange={handleChange}
              name="longDesc"
              value={values.longDesc}
              rows={4}
              placeholder="Long description"
              className="input-style"
            />
            {errors.longDesc && (
              <span className="error-message">{errors.longDesc}</span>
            )}
            <input
              onChange={handleChange}
              name="quality"
              value={values.quality}
              type="text"
              placeholder="Quality of the coin"
              className="input-style "
            />
            {errors.quality && (
              <span className="error-message">{errors.quality}</span>
            )}
            <input
              onChange={handleChange}
              name="weight"
              value={values.weight}
              type="text"
              placeholder="Weight"
              className="input-style"
            />
            {errors.weight && (
              <span className="error-message">{errors.weight}</span>
            )}
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
              {errors.imgObverse && (
                <span className="error-message">{errors.imgObverse}</span>
              )}
              <input
                onChange={handleChange}
                name="imgReverse"
                value={values.imgReverse}
                type="text"
                placeholder="Link to reverse image"
                className="input-style mb-6"
              />
              {errors.imgReverse && (
                <span className="error-message">{errors.imgReverse}</span>
              )}
              <select
                name="category"
                value={values.category}
                className="input-style"
                onChange={handleChange}
              >
                {values.category._id ? (
                  <option value={values.category._id}>
                    {values.category.title}
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
              {errors.category && (
                <span className="error-message">{errors.category}</span>
              )}
            </div>
            <div className="flex justify-around ">
              <button
                type="submit"
                className="border rounded-md border-violet-600 cursor-pointer transition-all text-sm py-4 px-12 hover:bg-violet-800 p-2 text-center bg-violet-600 text-white"
              >
                Save
              </button>
              <div
                onClick={closeModal}
                className="border rounded-md border-gray-500 cursor-pointer text-sm py-4 px-12 transition-all hover:bg-gray-700 p-2 text-center bg-gray-500 text-white"
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
