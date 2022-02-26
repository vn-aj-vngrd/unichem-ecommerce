import { useEffect } from "react";
import Hero from "../components/Hero";
import Featured from "../components/Featured";
import Services from "../components/Services";
import Preview from "../components/Preview";
import Categories from "../components/Categories";

const Home = () => {
  useEffect(() => {
    document.title = "Unichem";
  });

  return (
    <>
      <Hero />
      <Featured />
      <Categories />
      <Preview />
      <Services />
    </>
  );
};

export default Home;
