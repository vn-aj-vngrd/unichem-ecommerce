import { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DataTable from "../../components/DataTable";
import SectionTitle from "../../components/SectionTitle";
import CreateProduct from "../../components/CreateProduct";
import UpdateProduct from "../../components/UpdateProduct";
import ViewProduct from "../../components/ViewProduct";

import {
  getProducts,
  resetProduct,
  deleteProduct,
} from "../../features/products/productSlice";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

const ManageProducts = () => {
  const dispatch = useDispatch();
  const moment = require("moment");

  const {
    products,
    isProductLoading,
    isProductError,
    productMessage,
    isProductDeleted,
    isProductUpdated,
    isProductCreated,
  } = useSelector((state) => state.products);

  useEffect(() => {
    document.title = "Unichem Store | Products";

    dispatch(getProducts());

    if (isProductError) {
      toast.error(productMessage);
    }

    if (isProductCreated) {
      toast.success("Product created successfully");
    }

    if (isProductDeleted) {
      toast.success("Product deleted successfully");
    }

    if (isProductUpdated) {
      toast.success("Product updated successfully");
    }

    return () => {
      dispatch(resetProduct());
    };
  }, [
    isProductError,
    productMessage,
    isProductDeleted,
    isProductUpdated,
    isProductCreated,
    dispatch,
  ]);

  const columns = [
    "Product ID",
    "Name",
    "Brand",
    "Sale",
    "Sale Percent",
    "Created Date",
    "Updated Date",
    "Stock Status",
    "",
    "",
  ];

  let data = [];

  if (products) {
    products.forEach((product) => {
      let temp = [];
      temp.push(product._doc._id);
      temp.push(product._doc.productName);
      temp.push(product._doc.brand);

      temp.push(product._doc.isSale ? "Yes" : "No");

      if (product._doc.salePercent) {
        temp.push(product._doc.salePercent.toString().concat("%"));
      } else {
        temp.push("0%");
      }

      temp.push(moment(product._doc.createdAt).format("llll"));
      temp.push(moment(product._doc.updatedAt).format("llll"));

      let stockStatus;
      for (let i = 0; i < product._doc.minStock.length; i++) {
        if (product._doc.quantities[i] === 0) {
          stockStatus = "severe-stock";
        } else if (product._doc.quantities[i] < product._doc.minStock[i]) {
          stockStatus = "low-stock";
        } else {
          stockStatus = "good-stock";
        }
      }

      if (stockStatus === "severe-stock") {
        temp.push(<span class="badge bg-danger">Out of Stock</span>);
      } else if (stockStatus === "low-stock") {
        temp.push(<span class="badge bg-secondary">Low Stock</span>);
      } else {
        temp.push(<span class="badge bg-success">Optimal</span>);
      }

      if (product) {
        temp.push(<ViewProduct product={product} />);
        temp.push(<UpdateProduct product={product} />);
      }
      data.push(temp);
    });
  }

  const options = {
    filterType: "checkbox",
    elevation: 0,
    onRowsDelete: (rowsDeleted) => {
      rowsDeleted.data.forEach((item) => {
        dispatch(deleteProduct(data[item.dataIndex][0]));
      });
    },
  };

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

      {isProductLoading ? (
        <>
          <Spinner />
        </>
      ) : (
        <div className="row mt-3 mb-4">
          <DataTable
            title="Products"
            columns={columns}
            data={data}
            options={options}
          />
        </div>
      )}

      <Footer userType="admin" />
    </div>
  );
};

export default ManageProducts;
