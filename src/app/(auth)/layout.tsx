"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const LayoutAuth = ({ children }: Props) => {
  const pathname = usePathname();

  console.log({ pathname });

  return (
    <div className="h-[100vh] flex">
      <div className="w-1/2">
        <img
          src={
            pathname === "/login" ? "/images/login.jpg" : "/images/signup.jpg"
          }
          alt="image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-1/2">{children}</div>
    </div>
  );
};

export default LayoutAuth;
