import React from "react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../features/products/productSlice";
import { toast } from "react-toastify";

const DeleteProduct = (id) => {
  const dispatch = useDispatch();

  const handleDelete = () => {

    dispatch(deleteProduct(id));
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
          className="btn-alt"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default DeleteProduct;
