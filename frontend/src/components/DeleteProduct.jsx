import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useState } from "react";

const UpdateProduct = (productID) => {
 
  const dispatch = useDispatch();

  const onClick = () => {
    console.log(productID);
    dispatch(deleteProduct(productID));
    toast.success("Product deleted successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <>
      <div className="button">
        <button
          type="button"
          className="btn"
          onClick={onClick}
        >
          Delete
        </button>
      </div>

      
    </>
  );
};

export default UpdateProduct;
