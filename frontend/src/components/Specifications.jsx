const Specifications = ({ product }) => {
  return (
    <div className="container">
      <div className="product-details-info">
        <div className="single-block">
          <div className="row">
            <div className="col-lg-6 col-12">
              <div className="info-body custom-responsive-margin">
                <h4>Description</h4>
                <p>{product._doc.description}</p>
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <div className="info-body">
                <h4>Specifications</h4>
                <ul className="normal-list">
                  {product._doc.specifications.map((specification, index) => (
                    <li key={index}>{specification}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Specifications;
