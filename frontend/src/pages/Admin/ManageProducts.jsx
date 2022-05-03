import { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DataTable from "../../components/DataTable";
import SectionTitle from "../../components/SectionTitle";
import CreateProduct from "../../components/CreateProduct";
import UpdateProduct from "../../components/UpdateProduct";
import DeleteProduct from "../../components/DeleteProduct";
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
        <div className="empty-container"></div>
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
      let temp = [];
      temp.push(
        <img className="avatar" alt="img" src={product._doc.images[0]} />
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
      
      if(product._doc.salePercent) {
        temp.push(product._doc.salePercent.toString().concat("%"));
      } else {
        temp.push("0%")
      }
      temp.push(product._doc.featured.toString().toUpperCase());
      temp.push(
        moment(product._doc.updatedAt).format("YYYY-MM-DD HH:mm:ss").toString()
      );
      temp.push(
        moment(product._doc.createdAt).format("YYYY-MM-DD HH:mm:ss").toString()
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
        <div><CreateProduct /></div>
      </div>

      <div className="row mt-3 mb-4">
        <DataTable title="Products" columns={columns} data={data} />
      </div>
      <Footer userType="admin" />
    </div>
  );
};

export default ManageProducts;

// <div className="body-content">
// <section className="">
//   <div className="container">
//     <div className="row">
//       <div className="col-12">
//         <div className="section-title">
//           <h2 className="wow fadeInUp" data-wow-delay=".4s">
//             Create New Product
//           </h2>
//           <p className="wow fadeInUp" data-wow-delay=".6s">
//             Enter the informations of each field
//           </p>
//         </div>
//       </div>
//       <div className="row">
//         <div className="">
//           <div className="contact-form-head">
//             <div className="form-main">
//               <form
//                 className="form"
//                 method="post"
//                 action="assets/mail/mail.php"
//               >
//                 <div className="row">
//                   <div className="col-lg-6 col-md-6 col-12">
//                     <div className="form-group">
//                       <input
//                         name="name"
//                         type="text"
//                         placeholder="Product Name"
//                         required="required"
//                       />
//                     </div>
//                   </div>
//                   <div className="col-lg-6 col-md-6 col-12">
//                     <div className="form-group">
//                       <input
//                         name="subject"
//                         type="text"
//                         placeholder="Brand Name"
//                         required="required"
//                       />
//                     </div>
//                   </div>
//                   <div className="col-lg-6 col-md-6 col-12">
//                     <div className="form-group">
//                       <select
//                         className="form-select form-select-custom form-select-lg"
//                         aria-label=".form-select-md example"
//                       >
//                         <option selected>Category</option>
//                         <option value="Adhesives">Adhesives</option>
//                         <option value="carTints">Car Tints</option>
//                         <option value="Construction">Construction</option>
//                         <option value="Epoxies">Epoxies</option>
//                         <option value="FoamSealants">
//                           Foam Sealants
//                         </option>
//                         <option value="Housekeeping">Housekeeping</option>
//                         <option value="IndustrialOils">
//                           Industrial Oils
//                         </option>
//                         <option value="Kitchen">Kitchen</option>
//                         <option value="Laundry">Laundry</option>
//                         <option value="Restroom">Restroom</option>
//                         <option value="Sealants">Sealants</option>
//                         <option value="Тарes">Тарes</option>
//                         <option value="Threadlockers">
//                           Threadlockers
//                         </option>
//                         <option value="WindowFilms">Window Films</option>
//                       </select>
//                     </div>
//                   </div>
//                   <div className="col-lg-6 col-md-6 col-12">
//                     <div className="form-group">
//                       <input
//                         name="phone"
//                         type="text"
//                         placeholder="Types"
//                         required="required"
//                       />
//                     </div>
//                   </div>
//                   <div className="col-12">
//                     <div className="form-group message">
//                       <textarea
//                         name="message"
//                         placeholder="Product Description"
//                       ></textarea>
//                     </div>
//                   </div>
//                   <div className="col-12">
//                     <div className="form-group message">
//                       <textarea
//                         name="message"
//                         placeholder="Product Specification"
//                       ></textarea>
//                     </div>
//                   </div>
//                   <div className="col-lg-3 col-md-6 col-12 d-flex align-items-center">
//                     <div className="form-check">
//                       <input
//                         className="form-check-input"
//                         type="checkbox"
//                         value=""
//                         id="flexCheckDefault"
//                       ></input>
//                       <label
//                         className="form-check-label"
//                         for="flexCheckDefault"
//                       >
//                         Feature this Product
//                       </label>
//                     </div>
//                   </div>

//                   <div className="col-lg-3 col-md-6 col-12">
//                     <div>
//                       <input
//                         className="form-control form-control-lg"
//                         id="formFileLg"
//                         type="file"
//                       ></input>
//                     </div>
//                   </div>

//                   <div className="col-lg-3 col-md-6 col-12">
//                     <div className="form-group">
//                       <input
//                         name="subject"
//                         type="number"
//                         placeholder="Quantity"
//                         required="required"
//                       />
//                     </div>
//                   </div>

//                   <div className="col-lg-3 col-md-6 col-12">
//                     <div className="form-group">
//                       <input
//                         name="subject"
//                         type="number"
//                         placeholder="Price"
//                         required="required"
//                       />
//                     </div>
//                   </div>

//                   <div className="col-12">
//                     <div className="form-group button text-center">
//                       <button type="submit" className="btn ">
//                         Create Product
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </section>
// </div>
