import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateProduct } from "../features/products/productSlice";
import { useState, useEffect } from "react";

const UpdateProduct = (product) => {
  let tempTypes = [];
  product.product._doc.types.forEach((type, index) => {
    tempTypes.push({
      type: type,
      quantity: product.product._doc.quantities[index],
      price: product.product._doc.prices[index],
    });
  });

  let tempSpecifications = [];
  product.product._doc.specifications.forEach((specification) => {
    let index = specification.indexOf(": ");

    tempSpecifications.push({
      specificationLabel: specification.slice(0, index),
      specificationValue: specification.slice(index + 2),
    });
  });

  let tempSalePercent = product.product._doc.salePercent
    ? product.product._doc.salePercent
    : 0;

  const [specificationEmpty, setSpecificationEmpty] = useState(false);
  const [typesEmpty, setTypesEmpty] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    
  });

  useEffect(() => {
    const defaultValues = {
      // images: product.product._doc.images,
      productName: product.product._doc.productName,
      brand: product.product._doc.brand,
      category: product.product._doc.category,
      description: product.product._doc.description,
      specifications: tempSpecifications,
      types: tempTypes,
      isSale: product.product._doc.isSale,
      salePercent: tempSalePercent,
      featured: product.product._doc.featured,
    };
    reset(defaultValues);
  }, [product, reset]);

  const {
    fields: typeFields,
    append: typeAppend,
    remove: typeRemove,
  } = useFieldArray({
    control,
    name: "types",
  });

  const {
    fields: specificationFields,
    append: specificationAppend,
    remove: specificationRemove,
  } = useFieldArray({
    control,
    name: "specifications",
  });

  const isSale = watch("isSale");
  // const [isSale, setisSale] = useState(isSaleWatch);

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    if (data.specifications.length === 0) {
      setSpecificationEmpty(true);
    } else {
      setSpecificationEmpty(false);
    }

    if (data.types.length === 0) {
      setTypesEmpty(true);
    } else {
      setTypesEmpty(false);
    }

    if (specificationEmpty || typesEmpty) {
      return;
    }

    let tempSpecificationsData = [];

    data.specifications.forEach((specification) => {
      tempSpecificationsData.push(
        specification.specificationLabel.concat(
          ": ",
          specification.specificationValue
        )
      );
    });

    let tempTypesData = [];
    let tempQuantitiesData = [];
    let tempPricesData = [];

    data.types.forEach((type) => {
      tempTypesData.push(type.type);
      tempQuantitiesData.push(parseFloat(type.quantity));
      tempPricesData.push(parseFloat(type.price));
    });

    const productData = {
      _id: product.product._doc._id,
      // images: data.images,
      productName: data.productName,
      brand: data.brand,
      category: data.category,
      specifications: tempSpecificationsData,
      types: tempTypesData,
      description: data.description,
      quantities: tempQuantitiesData,
      prices: tempPricesData,
      isSale: data.isSale,
      featured: data.featured,
    };

    let formData = new FormData();

    for (let i = 0; i < data.images.length; i++) {
      formData.append("images", data.images[i]);
    }

    for (var key in productData) {
      formData.append(key, productData[key]);
    }

    dispatch(updateProduct(formData));
  };

  // const addProductType = () => {
  //   setProductTypes([...productTypes, ""]);
  // };


  return (
    <>
      <div className="button">
        <button
          type="button"
          className="btn"
          data-bs-toggle="modal"
          data-bs-target={"#modal-form" + product.product._doc._id}
        >
          Update
        </button>
      </div>

      <div
        className="modal fade"
        id={"modal-form" + product.product._doc._id}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="modal-form"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered update-product-modal"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-body p-0">
              <div className="card p-3 p-lg-4 ">
                <button
                  type="button"
                  className="btn-close ms-auto"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h1 className="mb-0 h4">Product Information</h1>
                </div>
                <form
                  action="#"
                  className="mt-4"
                  onSubmit={handleSubmit(onSubmit)}
                  encType="multipart/form-data"
                >
                  <div className="form-group">
                    <div className="form-group mb-4">
                      <label>Product Image</label>
                      <div className="input-group">
                        <input
                          type="file"
                          className="form-control"
                          multiple
                          {...register("images")}
                          style={{
                            border: errors.images ? "1px solid #f44336" : "",
                          }}
                        />
                      </div>
                      {errors.images && (
                        <p className="error-message">
                          ⚠ {errors.images.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-group mb-4">
                      <label>Product Name</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          id="productName"
                          {...register("productName", {
                            required: {
                              value: true,
                              message: "Product name is required.",
                            },
                          })}
                          style={{
                            border: errors.productName
                              ? "1px solid #f44336"
                              : "",
                          }}
                        />
                      </div>
                      {errors.productName && (
                        <p className="error-message">
                          ⚠ {errors.productName.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-group mb-4">
                      <label>Brand</label>
                      <div className="input-group">
                        <input
                          className="form-control"
                          type="text"
                          id="brand"
                          {...register("brand", {
                            required: {
                              value: true,
                              message: "Brand is required.",
                            },
                          })}
                          style={{
                            border: errors.brand ? "1px solid #f44336" : "",
                          }}
                        />
                      </div>
                      {errors.brand && (
                        <p className="error-message">
                          ⚠ {errors.brand.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-group mb-4">
                      <label>Category</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          id="category"
                          {...register("category", {
                            required: {
                              value: true,
                              message: "Category is required.",
                            },
                          })}
                          style={{
                            border: errors.category ? "1px solid #f44336" : "",
                          }}
                        />
                      </div>
                      {errors.category && (
                        <p className="error-message">
                          ⚠ {errors.category.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-group mb-4">
                      <label htmlFor="textarea">Description</label>
                      <div className="input-group">
                        <textarea
                          className="form-control"
                          id="description"
                          rows="8"
                          {...register("description", {
                            required: {
                              value: true,
                              message: "Description is required",
                            },
                          })}
                          style={{
                            border: errors.description
                              ? "1px solid #f44336"
                              : "",
                          }}
                        ></textarea>
                      </div>
                      {errors.description && (
                        <p className="error-message">
                          ⚠ {errors.description.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <br></br>
                  <h5>Product Specifications</h5>
                  <br></br>
                  {specificationEmpty && (
                    <p className="error-message">
                      ⚠ Product Specifications are required
                    </p>
                  )}

                  {specificationFields.map((specification, index) => (
                    <div
                      key={specification.id}
                      className="product-specifications-modal d-flex"
                    >
                      <div className="form-group col-6">
                        <div className="form-group mb-4">
                          <label>Label</label>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              id="description"
                              {...register(
                                `specifications[${index}].specificationLabel`,
                                {
                                  required: {
                                    value: true,
                                    message: "Specification Label is required.",
                                  },
                                }
                              )}
                              style={{
                                border:
                                  Array.isArray(errors.specifications) &&
                                  errors.specifications[index]
                                    ? "1px solid #f44336"
                                    : "",
                              }}
                            />
                          </div>
                          {Array.isArray(errors.specifications) &&
                            errors.specifications[index].specificationLabel && (
                              <p className="error-message">
                                ⚠{" "}
                                {
                                  errors.specifications[index]
                                    .specificationLabel.message
                                }
                              </p>
                            )}
                        </div>
                      </div>
                      <div className="form-group col">
                        <div className="form-group mb-4">
                          <label>Value</label>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              id="description"
                              {...register(
                                `specifications[${index}].specificationValue`,
                                {
                                  required: {
                                    value: true,
                                    message: "Specification Value is required.",
                                  },
                                }
                              )}
                              style={{
                                border:
                                  Array.isArray(errors.specifications) &&
                                  errors.specifications[index].specificationValue
                                    ? "1px solid #f44336"
                                    : "",
                              }}
                            />
                          </div>
                          {Array.isArray(errors.specifications) &&
                            errors.specifications[index].specificationValue && (
                              <p className="error-message">
                                ⚠{" "}
                                {
                                  errors.specifications[index]
                                    .specificationValue.message
                                }
                              </p>
                            )}
                        </div>
                      </div>
                      <div
                        className="col-auto remove-type"
                        onClick={() => specificationRemove(index)}
                      >
                        <i className="remove-type-icon lni lni-close"></i>
                      </div>
                    </div>
                  ))}
                  <div
                    className="col-auto add-type"
                    onClick={() => specificationAppend({})}
                  >
                    Add specification <i className="add-type-icon">+</i>
                  </div>

                  <br></br>
                  <h5>Product Color/Types</h5>
                  <br></br>

                  {typeFields.map((productType, index) => (
                    <div
                      key={productType.id}
                      className="product-types-modal d-flex"
                    >
                      <div className="form-group col-6">
                        <div className="form-group mb-4">
                          <label>Type</label>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              id="types"
                              {...register(`types[${index}].type`, {
                                required: {
                                  value: true,
                                  message: "Product type is required.",
                                },
                              })}
                              style={{
                                border:
                                  Array.isArray(errors.types) &&
                                  errors.types[index].type
                                    ? "1px solid #f44336"
                                    : "",
                              }}
                            />
                          </div>
                          {Array.isArray(errors.types) &&
                            errors.types[index].type && (
                              <p className="error-message">
                                ⚠ {errors.types[index].type.message}
                              </p>
                            )}
                        </div>
                      </div>

                      <div className="form-group col">
                        <div className="form-group mb-4">
                          <label>Quantity</label>
                          <div className="input-group">
                            <input
                              type="number"
                              className="form-control"
                              id="types"
                              step="any"
                              {...register(`types[${index}].quantity`, {
                                required: {
                                  value: true,
                                  message: "Product quantity is required.",
                                },
                                min: {
                                  value: 0,
                                  message:
                                    "Product quantity must be greater than 0.",
                                },
                              })}
                              style={{
                                border:
                                  Array.isArray(errors.types) &&
                                  errors.types[index].quantity
                                    ? "1px solid #f44336"
                                    : "",
                              }}
                            />
                          </div>

                          {Array.isArray(errors.types) &&
                            errors.types[index].quantity && (
                              <p className="error-message">
                                ⚠ {errors.types[index].quantity.message}
                              </p>
                            )}
                        </div>
                      </div>

                      <div className="form-group col">
                        <div className="form-group mb-4">
                          <label>Price</label>
                          <div className="input-group">
                            <input
                              type="number"
                              className="form-control"
                              id="prices"
                              step="any"
                              {...register(`types[${index}].price`, {
                                required: {
                                  value: true,
                                  message: "Product price is required.",
                                },
                                validate: {
                                  positiveNumber: (value) => parseFloat(value),
                                },
                              })}
                              style={{
                                border:
                                  Array.isArray(errors.types) &&
                                  errors.types[index].price
                                    ? "1px solid #f44336"
                                    : "",
                              }}
                            />
                          </div>
                          {Array.isArray(errors.types) &&
                            errors.types[index].price && (
                              <p className="error-message">
                                ⚠ {errors.types[index].price.message}
                              </p>
                            )}
                        </div>
                      </div>

                      <div
                        className="col-auto remove-type"
                        onClick={() => typeRemove(index)}
                      >
                        <i className="remove-type-icon lni lni-close"></i>
                      </div>
                    </div>
                  ))}
                  <div
                    className="col-auto add-type"
                    onClick={() => typeAppend({})}
                  >
                    Add product type <i className="add-type-icon">+</i>
                  </div>
                  <br></br>
                  <h5>Market Status</h5>
                  <br></br>
                  <div className="product-sale-modal d-flex">
                    <div className="form-group col-6">
                      <div className="form-group mb-4">
                        <label>Product Sale</label>
                        <div className="input-group">
                          <select
                            className="form-select"
                            id="isSale"
                            {...register("isSale", {
                              // required: {
                              //   value: true,
                              //   message: "Product sale is required.",
                              // },
                              // validate: (value) =>
                              //   "" !== value || "Product sale is required",
                            })}
                            style={{
                              border: errors.isSale ? "1px solid #f44336" : "",
                            }}
                          >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </select>
                        </div>
                        {errors.isSale && (
                          <p className="error-message">
                            ⚠ {errors.isSale.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="form-group col">
                      <div className="form-group mb-4">
                        <label>Sale Percent</label>
                        <div className="input-group">
                          <input
                            type="number"
                            disabled={
                              !isSale || isSale === "false" ? "disabled" : ""
                            }
                            className="form-control"
                            id="types"
                            {...register("salePercent", {
                              required: {
                                value: true,
                                message: "Sale Percent is required.",
                              },
                              min: {
                                value: 0,
                                message: "Sale Percent is invalid",
                              },
                            })}
                            style={{
                              border: errors.salePercent
                                ? "1px solid #f44336"
                                : "",
                            }}
                          />
                        </div>
                        {errors.salePercent && (
                          <p className="error-message">
                            ⚠ {errors.salePercent.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-group mb-4">
                      <label>Feature Product</label>
                      <div className="input-group">
                        <select
                          className="form-select"
                          id="featured"
                          {...register("featured", {
                            // required: {
                            //   value: true,
                            //   message: "Feature product is required.",
                            // },
                            // validate: (value) =>
                            //   "" !== value || "Feature product is required",
                          })}
                          style={{
                            border: errors.featured ? "1px solid #f44336" : "",
                          }}
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </div>
                      {errors.featured && (
                        <p className="error-message">
                          ⚠ {errors.featured.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="d-grid button">
                    {errors ? (
                      <button className="btn">Save Changes</button>
                    ) : (
                      <button
                        type="submit"
                        className="btn"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        Save Changes
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
