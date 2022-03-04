import { useEffect } from "react";
import Promo from "../components/Promo";
import Featured from "../components/Featured";
import Services from "../components/Services";
import Preview from "../components/Preview";
import Categories from "../components/Categories";


const Home = () => {
  useEffect(() => {
    document.title = "Unichem Store";
  });

  return (
    <>
      <Promo />
      <Featured />
      <Categories />
      <Preview />
      <Services />
    </>
  );
};

export default Home;
