"use client";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const LayoutLogin = ({ children }: Props) => {
  const pathname = usePathname();

  return (
    <div className="flex h-[100vh]">
      <div className="w-1/2">
        <img
          src={
            pathname === "/login" ? "/images/login.jpg" : "/images/signup.jpg"
          }
          alt="image"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="w-1/2">{children}</div>
    </div>
  );
};

export default LayoutLogin;
