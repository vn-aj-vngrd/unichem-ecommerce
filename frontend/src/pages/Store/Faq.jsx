import { useEffect } from "react";

const Faq = () => {
  useEffect(() => {
    document.title = "Unichem Store | FAQ";
  });
  return (
    <section className="faq">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-title">
              <h2>
                Haven't found the answer?
                <br /> Ask us your question.
              </h2>
              <p>
                We normally respond within 2 business days. Most popular
                questions will appear on this page.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-10 offset-lg-1 col-md-12 col-12">
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    <span className="title">
                      What payment methods do you accept?
                    </span>
                    <i className="lni lni-plus"></i>
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Aliquam consectetur sit amet ante nec vulputate. Nulla
                      aliquam, justo auctor consequat tincidunt, arcu erat
                      mattis lorem, lacinia lacinia dui enim at eros.
                      Pellentesque ut gravida augue. Duis ac dictum tellus
                    </p>
                    <p>
                      Anim pariatur cliche reprehenderit, enim eiusmod high life
                      accusamus terry richardson ad squid. 3 wolf moon officia
                      aute. non cupidatat skateboard dolor brunch. Foosd truck
                      quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
                      tempor, sunt alqua put a bird on it squid single-origin
                      coffee nulla assumenda shoreditch et. Nihil anim ke ffiyeh
                      helvetica, craft beer labore wes anderson cred nesciunt
                      sapiente ea proident.
                    </p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    <span className="title">How long will delivery take?</span>
                    <i className="lni lni-plus"></i>
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                      Anim pariatur cliche reprehenderit, enim eiusmod high life
                      accusamus terry richardson ad squid. 3 wolf moon officia
                      aute. non cupidatat skateboard dolor brunch. Foosd truck
                      quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
                      tempor, sunt alqua put a bird on it squid single-origin
                      coffee nulla assumenda shoreditch et. Nihil anim ke ffiyeh
                      helvetica, craft beer labore wes anderson cred nesciunt
                      sapiente ea proident.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Aliquam consectetur sit amet ante nec vulputate. Nulla
                      aliquam, justo auctor consequat tincidunt, arcu erat
                      mattis lorem, lacinia lacinia dui enim at eros.
                      Pellentesque ut gravida augue. Duis ac dictum tellus
                    </p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    <span className="title">
                      Do I need an account to place an order?
                    </span>
                    <i className="lni lni-plus"></i>
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Voluptas expedita, repellendus est nemo cum quibusdam
                      optio, voluptate hic a tempora facere, nihil non itaque
                      alias similique quas quam odit consequatur.
                    </p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFour">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                  >
                    <span className="title">
                      Do you have discounts for returning customers?
                    </span>
                    <i className="lni lni-plus"></i>
                  </button>
                </h2>
                <div
                  id="collapseFour"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFour"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                      Anim pariatur cliche reprehenderit, enim eiusmod high life
                      accusamus terry richardson ad squid. 3 wolf moon officia
                      aute. non cupidatat skateboard dolor brunch. Foosd truck
                      quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
                      tempor, sunt alqua put a bird on it squid single-origin
                      coffee nulla assumenda shoreditch et.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Provident iure ab nisi, magnam vitae. Laboriosam laborum
                      suscipit recusandae officia laudantium, consectetur
                      adipisci voluptates doloremque quisquam. Id rerum iusto
                      reprehenderit assumenda!
                    </p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFive">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFive"
                    aria-expanded="false"
                    aria-controls="collapseFive"
                  >
                    <span className="title">
                      What are the product refund conditions?
                    </span>
                    <i className="lni lni-plus"></i>
                  </button>
                </h2>
                <div
                  id="collapseFive"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFive"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                      Anim pariatur cliche reprehenderit, enim eiusmod high life
                      accusamus terry richardson ad squid. 3 wolf moon officia
                      aute. non cupidatat skateboard dolor brunch. Foosd truck
                      quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
                      tempor, sunt alqua put a bird on it squid single-origin
                      coffee nulla assumenda shoreditch et.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
