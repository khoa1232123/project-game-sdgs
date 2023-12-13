import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Wrapper = ({ children, className = "" }: Props) => {
  return <div className={`w-full ${className}`}>{children}</div>;
};

export default Wrapper;
