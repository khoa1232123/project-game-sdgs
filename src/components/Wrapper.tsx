import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Wrapper = ({ children, className = "" }: Props) => {
  return <div className={`wrapper ${className}`}>{children}</div>;
};

export default Wrapper;
