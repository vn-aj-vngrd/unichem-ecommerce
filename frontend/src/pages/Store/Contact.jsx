import { useEffect } from "react";

const Contact = () => {
  useEffect(() => {
    document.title = "Unichem | Contact";
  });

  return (
    // margin-top 200 so that container may be visible
    <div className="container mt-200">Contact</div>
  )
}

export default Contact