import LayoutLogin from "@/components/LayoutLogin";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const LayoutPlayerLogin = ({ children }: Props) => {
  return <LayoutLogin>{children}</LayoutLogin>;
};

export default LayoutPlayerLogin;
