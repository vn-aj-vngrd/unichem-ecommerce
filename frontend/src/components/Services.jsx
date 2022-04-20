const Services = () => {
  return (
    <section className="shipping-info section">
      <div className="section-title">
        <h2>Our Services</h2>
        <p>We present our online premium services.</p>
      </div>
      <div className="container">
        <ul className="box-shadow">
          <li>
            <div className="media-icon">
              <i className="lni lni-delivery"></i>
            </div>
            <div className="media-body">
              <h5>Reliable Shipping</h5>
              <span>Fast and Safe</span>
            </div>
          </li>
          <li>
            <div className="media-icon">
              <i className="lni lni-support"></i>
            </div>
            <div className="media-body">
              <h5>Quality Support</h5>
              <span>Ease and Convenience</span>
            </div>
          </li>
          <li>
            <div className="media-icon">
              <i className="lni lni-credit-cards"></i>
            </div>
            <div className="media-body">
              <h5>Online Payment</h5>
              <span>Secure and Quick</span>
            </div>
          </li>
          <li>
            <div className="media-icon">
              <i className="lni lni-package"></i>
            </div>
            <div className="media-body">
              <h5>Track my Order</h5>
              <span>Hassle Free Shopping</span>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Services;
