import { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Home = () => {
  useEffect(() => {
    document.title = "Unichem Store | Dashboard";
  });
  return (
    <div className="content">
      <Header />
      <div className="row mt-3">Promotions</div>
      <Footer userType="admin" />
    </div>
  );
};

export default Home;
