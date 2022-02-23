import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    document.title = "Unichem | About";
  });

  return (
    <div className="container mt-200">About</div>
  )
}

export default About