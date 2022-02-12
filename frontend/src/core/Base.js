import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

// Base component contain NavBar & Footer
const Base = ({ children }) => {
  return (
    <main className="bg-gray-100 relative overflow-auto h-screen">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default Base;
