import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, categoriesList, categoryState, toDoState } from "../atoms";

interface ICategoryForm {
  category: string;
}

function AddCustomCategory() {
  const setCategoriesList = useSetRecoilState(categoriesList);
  const { register, handleSubmit, setValue } = useForm<ICategoryForm>();
  const handleValid = ({ category }: ICategoryForm) => {
    setCategoriesList((oldCategories) => [
      category,
      ...oldCategories,
    ]);
    setValue("category", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("category", { required: "Please Write a To Do" })}
        placeholder="Add your Category!"
      ></input>
      <button>Add Category</button>
    </form>
  );
}

export default AddCustomCategory;
