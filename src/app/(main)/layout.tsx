import Header from "@/components/Header";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <div className="h-[100vh]">
      <Header />
      {children}
    </div>
  );
};

export default MainLayout;
