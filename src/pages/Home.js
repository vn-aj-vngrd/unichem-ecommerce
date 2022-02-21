import React from "react";
import Feature from "../components/Feature";
import Trending from "../components/Trending";
import Services from "../components/Services";
import Preview from "../components/Preview";

const Home = () => {
  return (
    <div>
      <Feature />
      <Trending />
      <Preview />
      <Services />
    </div>
  );
};

export default Home;
