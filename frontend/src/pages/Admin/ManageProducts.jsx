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
  console.log(products)
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
    "Category",
    "Types",
    "Description",
    "Sale",
    "Sale Percent",
    "Featured",
    "Created",
    "Updated",
    "",
    "",
  ];

  let data = [];
  const maxLength = 50;
  if (products) {
    products.forEach((product) => {
      let temp = [];
      temp.push(product._doc._id);
      temp.push(product._doc.productName);
      temp.push(product._doc.brand);
      temp.push(product._doc.category);
      temp.push(product._doc.types.toString().split(",").join(", "));
      product._doc.description.length > maxLength
        ? temp.push(product._doc.description.substr(0, maxLength).concat("..."))
        : temp.push(product._doc.description.substr(0, maxLength));
      temp.push(product._doc.isSale ? "Yes" : "No");

      if (product._doc.salePercent) {
        temp.push(product._doc.salePercent.toString().concat("%"));
      } else {
        temp.push("0%");
      }
      temp.push(product._doc.featured ? "Yes" : "No");
      temp.push(moment(product._doc.createdAt).format("llll"));
      temp.push(moment(product._doc.updatedAt).format("llll"));
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
