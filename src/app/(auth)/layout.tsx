"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const LayoutAuth = ({ children }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useCurrentUser();

  useEffect(() => {
    console.log({ user });

    if (user?.uid) {
      router.push("/");
    }
  }, [user]);

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

export default LayoutAuth;
