import { useEffect } from "react";
import Breadcrumb from "../../components/Breadcrumb";

const Manage = () => {
  useEffect(() => {
    document.title = "Unichem | Manage Acccount";
  });

  return (
    <>
      <Breadcrumb type="manage" />
      {/* content here */}
    </>
  );
};

export default Manage;
