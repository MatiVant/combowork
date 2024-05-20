import React from "react";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import BottomNavBar from "./BottomNavBar";

const Home: React.FC = () => {
  return (
    <div >
      <Body />
      <Footer />
      <BottomNavBar />
    </div>
  );
};

export default Home;
