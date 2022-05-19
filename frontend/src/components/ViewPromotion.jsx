const ViewPromotion = ({ promo }) => {
  const moment = require("moment");
  
  return (
    <>
      <div className="button">
        <button
          type="button"
          className=" btn-alt"
          data-bs-toggle="modal"
          data-bs-target={`#VOM${promo._id}`}
        >
          View
        </button>
      </div>

      <div
        className="modal fade"
        id={`VOM${promo._id}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="modal-form"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body p-0">
              <div className="card p-3 p-lg-4">
                <button
                  type="button"
                  className="btn-close ms-auto"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
                <div className="text-center text-md-center mb-2 mt-md-0">
                  <h1 className="mb-0 h4">Promotion Information</h1>
                </div>

                <p className="text-center">Promotion ID: {promo._id}</p>
                <div className="mt-2">
                  <div className="d-flex justify-content-center align-items-center mb-4">
                    <div className="w-25">
                      <img src={promo.image} className="view-image" alt="#" />
                    </div>
                    <div className="ms-3">
                      Promo Name: {promo.promoName}
                      <br />
                      Start Date: {moment(promo.startDate).format("llll")}
                      <br />
                      Expiry Date: {moment(promo.expiryDate).format("llll")}
                      <br />
                      Description: {promo.description}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewPromotion;
