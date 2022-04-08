import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Breadcrumb from "../../components/Breadcrumb";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    document.title = "Unichem Store | Cart";

    if (!user) {
      navigate("/");
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  return (
    <>
      <Breadcrumb type="checkout" />
      <section className="checkout-wrapper">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="checkout-steps-form-style">
                <ul id="accordionExample">
                  <li>
                    <div
                      className="title collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseProduct"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      Products Ordered
                    </div>
                    <section
                      className="collapse show"
                      id="collapseProduct"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="row">
                        <div>
                          <>
                            <div
                              // key={cart._doc._id}
                              className="cart-list-head accordion-bodybox-shadow"
                            >
                              <div className="cart-single-list">
                                <div className="row align-items-center">
                                  <div className="col-lg-2 col-md-2 col-12">
                                    {/* <Link
                                    // to={`/product-details/${cart.product._id}`}
                                    > */}
                                    <img
                                      src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBESEhYSEhIZEREREhwSEhgaEhoSEhIUGRwZGhkWGhgcJC4lHB4sHxgYJjsmKy8xNTU3GiRIQDszPy84NTEBDAwMEA8QHxISHzQrJCs0NDQ2NDQ3MTQxNjExNDE9ODQxNDQxNjQ0NDQ0NDQxMTQ0NDQ0NDE0NDQ0NDQ0NT0xNP/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABQYCAwQHCAH/xABAEAACAQIDAwgIBAQFBQAAAAAAAQIDEQQSIQUxUQcTIjJBYXGBBhQ1cpGhscEzsrPRI0JSghUWosLwJENTYnP/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAQIDBAYF/8QAMREBAAECBAMGBgEFAQAAAAAAAAECEQMSITEEQVEzYXFyobEUgZHB0fETIiNCUvAF/9oADAMBAAIRAxEAPwD2YAAAAAAAAAAAAAAAAH42a3Wgt8or+5AbQa1Ui90k/NGwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAObaH4cvL6oq+N639v7lm2i/4b8UVrG9fyQG/BdVeJaSq4PqebLSgP0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAce0+p/cvuVrG9fyRY9qPoL3vsyuYzr+SA3YLq+ZaKe5eCKvgeq/e/Ys9F9GPur6AbAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGbUqaxjw1fmQWJScm7kvtTrv3UQld6gdOEaSa77lhwNTNBcY9F+RWsMWHZfUfvfZAdwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABhN2TfBXAgtoYmEpNxkmrW4aoha9ZX3mqpVV95z86tNe2P5QmyTw1ZcSf2ViYawzdJu6XFW4+RT4VVprw/MSmw6q56Gvbb/SwWXEABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGnFStTm+EJP4Jm4jdqYulGnOEq1OEpQlFZpqOrTQN1Arz1f/OxnOparxj+UwxmMowk4OvTvFXdp6Ws+3d2nN/iFFvStBrMv+7HclbiVvDaaaukuyE93h/vRL7DqWrU/wD6RXxdiuLaFFac9C9rfix/qT4kvsLFUZVYyWIpxVOcXLNPLule2u/cLwZKrbS9OBooYmnUV4TjNcYyUl8jeWYgAAAAAAAAAAAAAAAAAAAAAAAAAAEF6VbcWCw/OWzVJvJTXY5NN3fckmydKXym4JTwfO3alQqKSXZLM1Bp/G/kROzbh6aa8ammvaZeebR9McVVbU6kt/VUssPhHQhqm05y4nLOEm9y+Jg6cuHzRjMvRxRRTFqYiGqeVtt5rvf0rGHMx4tf3Gz1eXD6fufvMy4fT9xoznNO8Q1qlFdsr+8bsPUUHeLd333uOafD6fuFSlfd9P3IWi+1oSNHbE4O6umu1Nplk2L6eYqnJXlKrCPWhNp3j22lLVMpfNy4fNG6kmnuRMStOHRiaVUxL6OwWJhWpwqwd4VIKpF90ldHScGx8GqFClRTclTpxim97st53m7y82vNtgABAAAAAAAAAAAAAAAAAAAAAAFX5RPZ1bxh+pEtBV+UX2bW8YfqQInZvwvb0eaPeHia+hdtoejVCFHDUoxaxuIqwpObnJq7jGVR5b9WMpxj5MpmEqZJRm4qahNTyvqzytPK+52sWzEenNWSWWhGM1VjWUnKUsrU+clGKkrxTejs9xz6avvY0Yl6cnz1t+47tb92iUxXolhHQlGknz8IZlPnG5tunKcc8bZUpRi9I6xvHec+O2FszC0nCvUfPxjfPGbzzkpKE8lO1siamtXmeR+JzbR9NM9LJQpSpzkkm5TjJU1ZRtFRScnlWXNJtqN12me29sxxCpRqYGpGtGsq9VSp9J023KcKcmsyi5Sb6S0vYtNnLTGPGXPM2v11/Xd8u+ZTE+i+y1UoYeMa7rYpKpBOatTp6OTnweVStv1RqobB2S/XJyp1nDBTak86UZKKtli79KWaMt9t6OD/ADZNY+pi3hZSm8PzdKDbToxSTc5dF3XWe5aSZCx2+1gpYNU9a1bnqtXnOlN3Ty5badWOt+x6ai9KacLHmIiap5c+s6/SNO+Z00WfHbM2fRwfrKwjk68JTpxniHGcIOyptxcrzbupWV97PPizbY9LvWIQh6rSgqVlF2zTyRTShmaXR1vbikVl/cibX0dXCU4kdpvM9b8/GX0fR6sfBfQ2Gul1V4fY2HQ8xGwAAkAAAAAAAAAAAAAAAAAAAAACr8ovs2t4w/UgWgq/KL7NreMP1IETs34Xt6PNHvDxGH3MzowcKbh0ou93qp5fszo5mj/7x81P7I5JrpvZ6f8Ajr3iPb8tWyKs44ilKlFTqxqRdOElmjKd1lTSa0vbtRfdoY7EPFYXB060/WVOSxVaKtFc5KM6lKDd7xio+Vo95TsBQy1YypVpRqxmnCXNR6Mux6yt8Sw1FtSU6dSWJnKdK8qcuaotwusrekrap21LU1xycfEYUzVEzaNJ36625TpHP5uzC7YdfFbTWWLi8LXcZ5P4qjTjGnGKl/S0r24s87LPhNjYmm5yhVnB1KcoVHkheUJdaLzT7beJEzwNOEnGU5XjJxdqcbXTs9czImuOa+BhRTMxRrtt3RZHH4+zxJDmqC7Jy8Zxj9EzRjFTSjkjbXVubk3p8CIrpmbOuiiqJiZj2+0voen1V4fY2GFPqrwRmdjx8AAAAAAAAAAAAAAAAAAAAAAAABV+UX2bW8YfqQLQVflF9m1vGH6kSJ2b8L29Hmj3h41hMSoxtkjPV6tyUvlK3yOmOLpyaXNNNuyy1Lav3kyOp7vMyOWaaZ5PTZpjaZ+srVQqVaaUPVZNRzTV4wnJpNZtbdJXaNdfES6LnQnBRl/4Ek3bc7tXVov5lb52X9T0Vl0not9vAyliJtJOcmluWdtL5kZaejL+u97x9P2s86VaEZOWGlaKk5NwpqSUbKWt2/54/ExqYarUjph2oytO6nSh2SmtbaaNldljKz0dSTT3pzk0/mYc9UemabW7rSa7kMlPQ/u73i/g6vXafZSv707/AJYo58ViM+VZIxs76NtvTtzSZ+wwVaXVpzku6EmvkjTWpShJRnFxktWmrNXV1p4MmmmI2htRXeuIv6y+j6fVXgjMwp7l4GZ1vIgAAAAAAAAAAAAAAAAAAAAAAABV+UX2bW8YfniWgq/KL7NreMPzxInZvwvb0eaPeHiNLd5nThoQk+lKUY3SvGKk9e5tfUwwOFnUbjTi5yXSaW+10vq18SU2bgcTTr026VSC5yKk8soK11o5LcvM53oq64i+uvi4JUqbjeM5OWvRlBR0SvfMpP6HQsHN0U7NyeacEldOGikm+Ly3XGz7bImdqUsqptxm4SnNzjHW9lDKr9ibdm+BBYrFVZ6PNCCd1BJxjFrc7drXH4WIhSJqq2+3f0iHGTGzK2Mpwao0ZSjOWe/NSne6S0a0askcOEWerHnE55m8yvLNLovtWvZ8j0XG7Vr4bD4bmqmSH+HxeRrpKST6V2t9lZLe2uzttRF2HGY8YVMRNN7qxg6e0naPqtbJly9HDSi2rKPWlG25L4Ig9s0KlOu4VISpSWW8JNOcVlVrtd1i3S9KK8lOnPEThGGjmn07ynHL0m0tIt6a976pC+n6ttCWuboUte2X8OGpaqmynA8T/LjWyxGnLxh7hT6q8EZmMNy8DI2fDAAAAAAAAAAAAAAAAAAAAAAAACr8o3s2t4w/UiWgq/KN7NreMP1IETs34bt6PNHvDyf0Zy55ZnHWDSjOahCbco6OTa3b+OhaMFQfORlzbtm6Uo1VKL79L/W7sUGlu8zswOLVKTbhGom08sm10ou8ZJxael33anPd97FwpqvMT/31hfp5nSjkjUzKbuoqSaTS7u5d97d5zJ1E9ViV4uXV79N+7vKk9owUXGnS5uTUkpc7KVlNZZaPu3fc444qqt1SS8Kkl9ybsY4af3H4mUk1/wBe+cvG9aWbNJwdnezk1a100/MtW08O6lPCPNDNPA0Hlk5K1nOUnfV63y6a3tdpFBhWmpqom8yd1K95X43LXgvS+SjSh6nTqTpUVQU5SneVOKaeZaKzV7301ZNFUROqnGcPXiU0xTy+XXqVm1STb/BkoybabtKLUZqcW25Rb4W6UVbSz4uUD2hLW/Qp63vf+HDt7SR/zW1Hm4UMDTitLer1JRWraWbq723w1Kzt3G1q9eVSuoxqu0ZKMcsEopKNld6ZUu0tVVEq/wDn8NiYWNmr6feH0JDcvBGZjDcvAyNXxQAAAAAAAAAAAAAAAAAAAAAAAAovKpjnDCQoq38epaXuw6X1yF6KDyq7PlUwtOvBN+rzee29QmrOXgnGPkyKtpdPB5fiKM3X15ery3Zs6am1VV1wW++lnp5m7FKjljzblm1z5uzSNraccxDy3n6pPj8zns9DMa3u7gcXOPi/iFUfF/EWLu06tnYrm5ttaSg4XyqeW/bleklpuIh1HxfxHOPi/iLIm0xaVve25JtqVCKlq1Gg3JvilJJX77kDj8VztXO9Mz3X3Ld8WRjm+PzNlC7klFNybskleUm9EklvZKMLDppm9L6J9HMc8RhKNaWsp01nsrLMujLTs1TJUiPRjAyw+DoUZdeFJZu6UulJeTbRLm8bavNYmXPOXa828AAEqAAAAAAAAAAAAAAAAAAAAAAa5wUk4yScWrNNXTT3po2ACm7S5Odm1m5KE6Em7vm59G/dGalFLuSRDYjkmov8PFTj79KNT6ZT0sFcsN6eKxo/yl5O+SSp2YyL8aFv9xonyTYnsxdN+MJr9z18DJC/xuP19IeRQ5JsR/Ni6a8KUn90b4ckcv5sdp22ofvM9WAyQfG4/wDt6R+HnOH5KcKvxMTVn7qhD6qRYti+hmAwbU6dLNVjunOTnJPik+jF96SLICYphnXxGLXFpqmwACWIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//Z"
                                      alt=""
                                    />
                                    {/* </Link> */}
                                  </div>
                                  <div className="col-lg-4 col-md-4 col-12">
                                    <h5>
                                      {/* <Link
                                      // to={`/product-details/${cart.product._id}`}
                                      > */}
                                      productName
                                      {/* </Link> */}
                                    </h5>
                                    <p className="product-des">
                                      <span>
                                        <em>Category: </em> Category
                                      </span>
                                      <span>
                                        <em>Type / Color:</em> Product Type
                                      </span>
                                    </p>
                                  </div>
                                  <div className="col-lg-2 col-md-2 col-12">
                                    <p>x21</p>
                                  </div>
                                  <div className="col-lg-2 col-md-2 col-12">
                                    <p>₱ 209.00</p>
                                  </div>
                                  <div className="col-lg-2 col-md-2 col-12">
                                    <p>₱ 500.00</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                          <>
                            <div
                              // key={cart._doc._id}
                              className="cart-list-head accordion-bodybox-shadow"
                            >
                              <div className="cart-single-list">
                                <div className="row align-items-center">
                                  <div className="col-lg-2 col-md-2 col-12">
                                    {/* <Link
                                    // to={`/product-details/${cart.product._id}`}
                                    > */}
                                    <img
                                      src="data:image/jpeg;base64,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"
                                      alt=""
                                    />
                                    {/* </Link> */}
                                  </div>
                                  <div className="col-lg-4 col-md-4 col-12">
                                    <h5>
                                      {/* <Link
                                      // to={`/product-details/${cart.product._id}`}
                                      > */}
                                      productName
                                      {/* </Link> */}
                                    </h5>
                                    <p className="product-des">
                                      <span>
                                        <em>Category: </em> Category
                                      </span>
                                      <span>
                                        <em>Type / Color:</em> Product Type
                                      </span>
                                    </p>
                                  </div>
                                  <div className="col-lg-2 col-md-2 col-12">
                                    x21
                                  </div>
                                  <div className="col-lg-2 col-md-2 col-12">
                                    <p>₱ 209.00</p>
                                  </div>
                                  <div className="col-lg-2 col-md-2 col-12">
                                    <p>₱ 500.00</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        </div>

                        {/* <div className="col-md-12">
                          <div className="steps-form-btn button">
                            <button
                              className="btn"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseTwo"
                              aria-expanded="false"
                              aria-controls="collapseTwo"
                            >
                              Next
                            </button>
                          </div>
                        </div> */}
                      </div>
                    </section>
                  </li>

                  <li>
                    <div
                      className="title collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseAddress"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      Payment Address
                    </div>
                    <section
                      className="profile-address-section collapse"
                      id="collapseAddress"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="row">
                        <div className="addresses">
                          <div className="profile-address">
                            <ul className="">
                              <li className="address-header">
                                <h6>Vanguardia Residence</h6>
                              </li>
                              <li>
                                <p>
                                  <b>Phone:</b> 09163760832
                                </p>
                              </li>
                              <li>
                                <p>
                                  <b>Address:</b> Address 1Address 1Address
                                  1Address 1Address 1, address2 address2
                                  address2 address2
                                </p>
                              </li>
                              <li>
                                <p>
                                  <b>Postal Code:</b> 6015
                                </p>
                              </li>
                              <br></br>
                              <li className="address-options button">
                                <button
                                  to="/checkout"
                                  // onClick={() => onSubmitDefault(index)}
                                  className="btn set-default-btn"
                                >
                                  Change Address
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </section>
                  </li>
                  <li>
                    <div
                      className="title collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Payment Method
                    </div>
                    <section
                      className="checkout-steps-form-content collapse"
                      id="collapseTwo"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="row">
                        <div className="col-md-12">
                          <div className="checkout-payment-option">
                            <h6 className="heading-6 font-weight-400 payment-title">
                              Select Delivery Option
                            </h6>
                            <div className="payment-option-wrapper">
                              <div className="single-payment-option">
                                <input
                                  type="radio"
                                  name="payment"
                                  id="payment-1"
                                />
                                <label htmlFor="payment-1">
                                  <p>Standerd payment</p>
                                </label>
                              </div>
                              <div className="single-payment-option">
                                <input
                                  type="radio"
                                  name="payment"
                                  id="payment-2"
                                />
                                <label htmlFor="payment-2">
                                  <p>Standerd payment</p>
                                </label>
                              </div>
                              <div className="single-payment-option">
                                <input
                                  type="radio"
                                  name="payment"
                                  id="payment-3"
                                />
                                <label htmlFor="payment-3">
                                  <p>Standerd payment</p>
                                </label>
                              </div>
                              <div className="single-payment-option">
                                <input
                                  type="radio"
                                  name="payment"
                                  id="payment-4"
                                />
                                <label htmlFor="payment-4">
                                  <p>Standerd payment</p>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="checkout-sidebar">
                <div className="checkout-sidebar-coupon">
                  <p>Apply valid coupon here</p>
                  <form action="#">
                    <div className="single-form form-default">
                      <div className="form-input form">
                        <input type="text" placeholder="Coupon Code" />
                      </div>
                      <div className="button">
                        <button className="btn">apply</button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="checkout-sidebar-price-table mt-3">
                  <h5 className="title">Pricing Table</h5>
                  <div className="sub-total-price">
                    <div className="total-price">
                      <p className="value">Product 1 Price:</p>
                      <p className="price">₱144.00</p>
                    </div>
                    <div className="total-price payment">
                      <p className="value">Product 2 Price:</p>
                      <p className="price">₱10.50</p>
                    </div>
                    <div className="total-price discount">
                      <p className="value">Product 3 Price:</p>
                      <p className="price">₱10.00</p>
                    </div>
                  </div>
                  <div className="total-payable">
                    <div className="payable-price">
                      <p className="value">Total Price:</p>
                      <p className="price">₱164.50</p>
                    </div>
                  </div>
                  <div className="price-table-btn button">
                    <button className="btn">Checkout</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
