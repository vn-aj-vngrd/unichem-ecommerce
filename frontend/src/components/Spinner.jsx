import React from "react";

const Spinner = () => {
  return (
    <div className="spinner-grow text-danger loading" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Spinner;
