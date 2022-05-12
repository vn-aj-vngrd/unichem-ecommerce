const ViewCoupon = ({ coupon }) => {
  const moment = require("moment");

  return (
    <>
      <div className="button">
        <button
          type="button"
          className=" btn-alt"
          data-bs-toggle="modal"
          data-bs-target={`#VOM${coupon._id}`}
        >
          View
        </button>
      </div>

      <div
        className="modal fade"
        id={`VOM${coupon._id}`}
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
                  <h1 className="mb-0 h4">Coupon Information</h1>
                </div>

                <p className="text-center">Coupon ID: {coupon._id}</p>
                <div className="mt-2">
                  <div className="d-flex justify-content-center align-items-center mb-4">
                    <div className="ms-3">
                      Coupon Code: {coupon.couponCode}
                      <br />
                      Coupon Type: {coupon.couponType}
                      <br />
                      Discount: {coupon.discount + "%"}
                      <br />
                      Required Amount: {"PHP" + coupon.requiredAmount}
                      <br />
                      Limit: {coupon.limit}
                      <br />
                      Start Date: {moment(coupon.startDate).format("1111")}
                      <br />
                      Expiry Date: {moment(coupon.expiryDate).format("llll")}
                      <br />
                      Description: {coupon.description}
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

export default ViewCoupon;
