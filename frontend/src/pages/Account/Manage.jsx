import { useEffect } from "react";

const Manage = () => {
  useEffect(() => {
    document.title = "Unichem | Manage Acccount";
  });

  return <div className="container mt-200">Manage</div>;
};

export default Manage;
