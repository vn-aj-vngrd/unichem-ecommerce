import React from "react";

const Spinner = ({ globalSpinner }) => {
  if (globalSpinner !== undefined && globalSpinner === "true") {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default Spinner;
