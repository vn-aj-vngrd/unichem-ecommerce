import React from "react";
import { useDispatch } from "react-redux";
import { deletePromo } from "../features/promos/promoSlice";
import { toast } from "react-toastify";

const DeletePromotion = (id) => {
  const dispatch = useDispatch();

  const handleDelete = () => {

    dispatch(deletePromo(id));
    toast.success("Promo deleted successfully", {
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

export default DeletePromotion;
