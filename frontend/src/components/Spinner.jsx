import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";
import PuffLoader from "react-spinners/PuffLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: #f44336;
`;

const Spinner = ({ globalSpinner, notifSpinner }) => {
  if (globalSpinner !== undefined && globalSpinner === "true") {
    return (
      <div className="loading">
        <PuffLoader color="#f44336" loading={true} css={override} size={60} />
        {/* <div className="loading-spinner"></div> */}
      </div>
    );
  }

  if (notifSpinner !== undefined && notifSpinner === "true") {
    return (
      <div className="spinner-container">
        <PuffLoader color="#f44336" loading={true} css={override} size={30} />
      </div>
    );
  }

  return (
    <div className="spinner-container">
      <BeatLoader color="#f44336" loading={true} css={override} size={13} />
    </div>
  );
};

export default Spinner;
