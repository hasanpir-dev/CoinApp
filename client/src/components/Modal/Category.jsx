import React, { useState } from "react";
import "./modal.css";
import { GrClose } from "react-icons/gr";
import { changeCategoryModal } from "../../features/editModalSlice.js";
import { useDispatch } from "react-redux";
import { addCategory } from "../../features/category/categoryActions.js";

const CategoryModal = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
    image: "",
  });

  const dispatch = useDispatch();
  const onChangeFn = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmitFn = (e) => {
    e.preventDefault();
    dispatch(changeCategoryModal(false));
    dispatch(addCategory(data));
    setData({ title: "", description: "", image: "" });
  };

  return (
    <div className="w-full h-screen bg-opacity-50 bg-black flex items-center justify-center fixed top-0 right-0 bottom-0 left-0 z-50">
      <div className="w-1/3 bg-white p-3">
        <div
          onClick={() => {
            dispatch(changeCategoryModal(false));
          }}
          className="flex justify-between items-center cursor-pointer"
        >
          <h3 className="font-bold text-2xl">ADD Category</h3>
          <GrClose size={20} />
        </div>
        <div className="">
          <div className="flex flex-col space-y-3 my-3">
            <input
              onChange={onChangeFn}
              name="title"
              value={data.title}
              type="text"
              placeholder="Category Name"
              className="input-style"
            />
            <input
              onChange={onChangeFn}
              name="description"
              value={data.description}
              type="text"
              placeholder="Category Description"
              className="input-style"
            />
            <input
              onChange={onChangeFn}
              name="image"
              value={data.image}
              type="text"
              placeholder="Category image"
              className="input-style"
            />
          </div>

          <div className="flex justify-between flex-col md:flex-row ">
            <div
              onClick={onSubmitFn}
              className="border rounded-md border-violet-600 cursor-pointer py-4 px-12 hover:bg-violet-800 transition-all p-2 text-sm text-center bg-violet-600 text-white"
            >
              Save
            </div>
            <div
              onClick={() => {
                dispatch(changeCategoryModal(false));
              }}
              className="border rounded-md border-gray-500 cursor-pointer text-sm py-4 px-12 hover:bg-gray-700 p-2 transition-all text-center bg-gray-500 text-white"
            >
              Cancel
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
