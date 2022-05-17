import { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DataTable from "../../components/DataTable";
import SectionTitle from "../../components/SectionTitle";
import CreateProduct from "../../components/CreateProduct";
import UpdateProduct from "../../components/UpdateProduct";
import ViewProduct from "../../components/ViewProduct";
import RowImage from "../../components/RowImage";
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

  const { products, isProductLoading, isProductError, productMessage, isProductDeleted, isProductUpdated, isProductCreated } =
    useSelector((state) => state.products);

  useEffect(() => {
    document.title = "Unichem Store | Products";
  });

  useEffect(() => {
    if (isProductError) {
      toast.error(productMessage);
    }

    dispatch(getProducts());

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
  }, [isProductError, productMessage, isProductDeleted, isProductUpdated, isProductCreated, dispatch]);

  const columns = [
    // "Product Image",
    "ProductID",
    "Name",
    "Brand",
    "Category",
    // "Specifications",
    "Types",
    "Description",
    // "Quantities",
    // "Prices",
    // "Sale Prices",
    "Sale",
    "Sale Percent",
    "Featured",
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
      // temp.push(
      //   <RowImage src={product._doc.images[0]} alt={product._doc.productName} />
      // );
      temp.push(product._doc._id);
      temp.push(product._doc.productName);
      temp.push(product._doc.brand);
      temp.push(product._doc.category);
      // temp.push(product._doc.specifications.toString().split(",").join(", "));
      temp.push(product._doc.types.toString().split(",").join(", "));
      product._doc.description.length > maxLength
        ? temp.push(product._doc.description.substr(0, maxLength).concat("..."))
        : temp.push(product._doc.description.substr(0, maxLength));
      // temp.push(product._doc.quantities.toString().split(",").join(", "));
      // temp.push(product._doc.prices.toString().split(",").join(", "));
      // let tempSalePrices = [];
      // for (let i = 0; i < product._doc.prices.length; i++) {
      //   tempSalePrices.push(
      //     product._doc.prices[i] -
      //       (product._doc.prices[i] * product._doc.salePercent) / 100
      //   );
      // }
      // temp.push(tempSalePrices.toString().split(",").join(", "));
      temp.push(product._doc.isSale ? "Yes" : "No");

      if (product._doc.salePercent) {
        temp.push(product._doc.salePercent.toString().concat("%"));
      } else {
        temp.push("0%");
      }
      temp.push(product._doc.featured ? "Yes" : "No");
      temp.push(moment(product._doc.updatedAt).format("llll"));
      temp.push(moment(product._doc.createdAt).format("llll"));
      if (product) {
        temp.push(<ViewProduct product={product} />);
        temp.push(<UpdateProduct product={product} />);
      }

      // if (product) {
      //   temp.push(<DeleteProduct id={product._doc._id} />);
      // }
      data.push(temp);
    });
  }

  const options = {
    filterType: "checkbox",
    elevation: 0,
    onRowsDelete: (rowsDeleted) => {
      rowsDeleted.data.forEach((item) => {
        // console.log(data[item.dataIndex][0]);
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
