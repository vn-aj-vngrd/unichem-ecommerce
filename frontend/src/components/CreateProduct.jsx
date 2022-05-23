import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setProduct } from "../features/products/productSlice";
import { useState, useEffect } from "react";

const CreateProduct = () => {
  const [formSuccessful, setFormSuccessful] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, touchedFields },
  } = useForm({
    mode: "all",
    defaultValues: {
      specifications: [
        {
          specificationLabel: "",
          specificationValue: "",
        },
      ],
      types: [
        {
          type: "",
          quantity: "",
          price: "",
        },
      ],
      isSale: false,
      featured: false,
    },
  });

  useEffect(() => {
    reset({
      images: "",
      productName: "",
      brand: "",
      category: "",
      description: "",
      specifications: [
        {
          specificationLabel: "",
          specificationValue: "",
        },
      ],
      types: [
        {
          type: "",
          quantity: "",
          price: "",
        },
      ],
      isSale: false,
      salePercent: "",
      featured: false,
    });

    if (formSuccessful === true) {
      setFormSuccessful(false);
    }
  }, [formSuccessful, reset]);

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
  const types = watch("types");
  const specifications = watch("specifications");

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    if (types.length === 0 || specifications.length === 0) {
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
      tempQuantitiesData.push(type.quantity);
      tempPricesData.push(type.price);
    });

    let tempSalePercent =
      !data.isSale || data.isSale === "false"
        ? 0
        : parseFloat(data.salePercent);

    const productData = {
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
      salePercent: tempSalePercent,
      featured: data.featured,
    };

    let formData = new FormData();

    for (let i = 0; i < data.images.length; i++) {
      formData.append("images", data.images[i]);
    }

    for (var key in productData) {
      if (Array.isArray(productData[key])) {
        for (let k = 0; k < productData[key].length; k++) {
          formData.append(key, productData[key][k]);
        }
      } else {
        formData.append(key, productData[key]);
      }
    }

    dispatch(setProduct(formData));
    setFormSuccessful(true);
  };
  return (
    <>
      <div className="col-12 mt-5">
        <button
          type="button"
          className="btn btn-block btn-gray-800 mb-3"
          data-bs-toggle="modal"
          data-bs-target="#modal-form-create-product"
        >
          Create Product
        </button>
      </div>

      <div
        className="modal fade"
        id="modal-form-create-product"
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
                          {...register("images", {
                            required: {
                              value: true,
                              message: "Product image is required.",
                            },
                          })}
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
                        <select
                          type="text"
                          className="form-select"
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
                        >
                          <option value="">Select option</option>
                          <option value="Loctite">Loctite</option>
                          <option value="3M">3M</option>
                          <option value="Phoenix Lubricants">
                            Phoenix Lubricants
                          </option>
                          <option value="Polymer Cleaning Chemicals">
                            Polymer Cleaning Chemicals
                          </option>
                        </select>
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
                        <select
                          type="text"
                          className="form-select"
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
                        >
                          <option value="">Select option</option>
                          <option value="Adhesives">Adhesives</option>
                          <option value="Car Tints">Car Tints</option>
                          <option value="Construction">Construction</option>
                          <option value="Epoxies">Epoxies</option>
                          <option value="Foam Sealants">Foam Sealants</option>
                          <option value="Housekeeping">Housekeeping</option>
                          <option value="Industrial Oils">
                            Industrial Oils
                          </option>
                          <option value="Kitchen">Kitchen</option>
                          <option value="Laundry">Laundry</option>
                          <option value="Restroom">Restroom</option>
                          <option value="Sealants">Sealants</option>
                          <option value="Tapes">Tapes</option>
                          <option value="Threadlockers">Threadlockers</option>
                          <option value="Window Films">Window Films</option>
                        </select>
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
                  {specifications.length === 0 && (
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
                                  errors.specifications[index] &&
                                  errors.specifications[index]
                                    .specificationLabel
                                    ? "1px solid #f44336"
                                    : "",
                              }}
                            />
                          </div>
                          {Array.isArray(errors.specifications) &&
                            errors.specifications[index] &&
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
                                  errors.specifications[index] &&
                                  errors.specifications[index]
                                    .specificationValue
                                    ? "1px solid #f44336"
                                    : "",
                              }}
                            />
                          </div>
                          {Array.isArray(errors.specifications) &&
                            errors.specifications[index] &&
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
                  {types.length === 0 && (
                    <p className="error-message">
                      ⚠ Product types are required
                    </p>
                  )}

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
                                  errors.types[index] &&
                                  errors.types[index].type
                                    ? "1px solid #f44336"
                                    : "",
                              }}
                            />
                          </div>
                          {Array.isArray(errors.types) &&
                            errors.types[index] &&
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
                                  errors.types[index] &&
                                  errors.types[index].quantity
                                    ? "1px solid #f44336"
                                    : "",
                              }}
                            />
                          </div>

                          {Array.isArray(errors.types) &&
                            errors.types[index] &&
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
                                  errors.types[index] &&
                                  errors.types[index].price
                                    ? "1px solid #f44336"
                                    : "",
                              }}
                            />
                          </div>
                          {Array.isArray(errors.types) &&
                            errors.types[index] &&
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
                  <div className="product-sale-modal d-flex">
                    <div className="form-group col-6">
                      <div className="form-group mb-4">
                        <label>Product Sale</label>
                        <div className="input-group">
                          <select
                            type="number"
                            className="form-select"
                            id="isSale"
                            {...register("isSale")}
                            style={{
                              border: errors.isSale ? "1px solid #f44336" : "",
                            }}
                          >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
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
                                value:
                                  !isSale || isSale === "false" ? false : true,
                                message: "Sale Percent is required.",
                              },
                              min: {
                                value: 0,
                                message: "Sale Percent must be greater than 0",
                              },
                              max: {
                                value: 100,
                                message: "Sale Percent must be less than 100",
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
                          {...register("featured")}
                          style={{
                            border: errors.featured ? "1px solid #f44336" : "",
                          }}
                        >
                          <option value="false">No</option>
                          <option value="true">Yes</option>
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
                    {Object.keys(touchedFields).length !== 0 &&
                      Object.keys(errors).length === 0 &&
                      types.length !== 0 &&
                      specifications.length !== 0 && (
                        <button
                          type="submit"
                          className="btn"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        >
                          Save Changes
                        </button>
                      )}
                    {(Object.keys(touchedFields).length === 0 ||
                      Object.keys(errors).length !== 0 ||
                      types.length === 0 ||
                      specifications.length === 0) && (
                      <button className="btn">Create Product</button>
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

export default CreateProduct;
