import { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DataTable from "../../components/DataTable";
import SectionTitle from "../../components/SectionTitle";
import CreateProduct from "../../components/CreateProduct";
import UpdateProduct from "../../components/UpdateProduct";
import DeleteProduct from "../../components/DeleteProduct";
import RowImage from "../../components/RowImage";
import {
  getProducts,
  resetProduct,
} from "../../features/products/productSlice";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../components/Spinner";

const ManageProducts = () => {
  const dispatch = useDispatch();
  const moment = require("moment");

  const { products, isProductLoading, isProductError, productMessage } =
    useSelector((state) => state.products);

  useEffect(() => {
    document.title = "Unichem Store | Products";
  });

  useEffect(() => {
    if (isProductError) {
      // console.log(productMessage);
    }

    dispatch(getProducts());

    return () => {
      dispatch(resetProduct());
    };
  }, [isProductError, productMessage, dispatch]);

  if (isProductLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  const columns = [
    "Product Image",
    "ProductID",
    "Name",
    "Brand",
    "Category",
    "Specifications",
    "Types",
    "Description",
    "Quantities",
    "Prices",
    "Sale Prices",
    "Sale Status",
    "Sale Percent",
    "Featured Status",
    "Updated",
    "Created",
    "",
    "",
  ];

  let data = [];
  const maxLength = 50;
  if (products) {
    products.forEach((product) => {
      console.log(product.images);
      let temp = [];
      temp.push(
        <RowImage src={product._doc.images[0]} alt={product._doc.productName} />
      );
      temp.push(product._doc._id);
      temp.push(product._doc.productName);
      temp.push(product._doc.brand);
      temp.push(product._doc.category);
      temp.push(product._doc.specifications.toString().split(",").join(", "));
      temp.push(product._doc.types.toString().split(",").join(", "));
      product._doc.description.length > maxLength
        ? temp.push(product._doc.description.substr(0, maxLength).concat("..."))
        : temp.push(product._doc.description.substr(0, maxLength));
      temp.push(product._doc.quantities.toString().split(",").join(", "));
      temp.push(product._doc.prices.toString().split(",").join(", "));
      let tempSalePrices = [];
      for (let i = 0; i < product._doc.prices.length; i++) {
        tempSalePrices.push(
          product._doc.prices[i] -
            (product._doc.prices[i] * product._doc.salePercent) / 100
        );
      }
      temp.push(tempSalePrices.toString().split(",").join(", "));
      temp.push(product._doc.isSale.toString().toUpperCase());

      if (product._doc.salePercent) {
        temp.push(product._doc.salePercent.toString().concat("%"));
      } else {
        temp.push("0%");
      }
      temp.push(product._doc.featured.toString().toUpperCase());
      temp.push(
        moment(product._doc.updatedAt).format("llll").toString()
      );
      temp.push(
        moment(product._doc.createdAt).format("llll").toString()
      );
      if (product) {
        temp.push(<UpdateProduct product={product} />);
      }

      if (product) {
        temp.push(<DeleteProduct id={product._doc._id} />);
      }
      data.push(temp);
    });
  }

  return (
    <div className="content">
      <Header />

      <div className="d-flex">
        <div className="me-auto">
          <SectionTitle
            title="Manage Products"
            subtitle="Below are the list of products."
            directory="Products"
          />
        </div>
        <div>
          <CreateProduct />
        </div>
      </div>

      <div className="row mt-3 mb-4">
        <DataTable title="Products" columns={columns} data={data} />
      </div>

      <Footer userType="admin" />
    </div>
  );
};

export default ManageProducts;
