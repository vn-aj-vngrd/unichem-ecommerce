import { useEffect } from "react";
import Header from "../../components/Header";

const Home = () => {
  useEffect(() => {
    document.title = "Unichem Store | Dashboard";
  });
  return (
    <div className="content">
      <Header />
      <div className="row mt-3">UserLists</div>
    </div>
  );
};

export default Home;
