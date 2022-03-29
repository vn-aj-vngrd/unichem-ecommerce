import { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SectionTitle from "../../components/SectionTitle";

const Home = () => {
  useEffect(() => {
    document.title = "Unichem Store | Dashboard";
  });
  return (
    <div className="content">
      <Header />
      <SectionTitle type="transactions"/>
      <div className="row mt-3">Transactions</div>
      <Footer userType="admin" />
    </div>
  );
};

export default Home;
