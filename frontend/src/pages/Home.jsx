import Feature from "../components/Feature";
import Trending from "../components/Trending";
import Services from "../components/Services";
import Preview from "../components/Preview";
import ScrollToTop from "../components/ScrollToTop";

const Home = () => {
  return (
    <>
      <ScrollToTop />
      <Feature />
      <Trending />
      <Preview />
      <Services />
    </>
  );
};

export default Home;
