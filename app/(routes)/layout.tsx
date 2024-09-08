import React from "react";
import Footer from "./_components/footer";
import Navbar from "./_components/Menu/Navbar";

interface RouterLayoutProps {
  children: React.ReactNode;
}

const RouterLayout = ({ children }: RouterLayoutProps) => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen ">{children}</div>
      <Footer />
    </>
  );
};

export default RouterLayout;
