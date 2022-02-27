import { useEffect } from "react";

const Manage = () => {
  useEffect(() => {
    document.title = "Unichem | Manage Acccount";
  });

  return <div className="body-content">Manage</div>;
};

export default Manage;
