import { useEffect } from "react";
import Feature from "../components/Feature";
import Trending from "../components/Trending";
import Services from "../components/Services";
import Preview from "../components/Preview";

const Home = () => {
  useEffect(() => {
    document.title = "Unichem";
  });

  return (
    <>
      <Feature />
      <Trending />
      <Preview />
      <Services />
    </>
  );
};

export default Home;
