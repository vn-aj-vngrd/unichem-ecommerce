import React from "react";
import { useDispatch } from "react-redux";
import { deleteCoupon } from "../features/coupons/couponSlice";
import { toast } from "react-toastify";

const DeleteCoupon = (id) => {
  const dispatch = useDispatch();

  const handleDelete = () => {

    dispatch(deleteCoupon(id));
    toast.success("Coupon deleted successfully", {
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

export default DeleteCoupon;
