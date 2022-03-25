import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = "Unichem Store | Admin";
  });
  return <div>Admin</div>;
};

export default Home;
