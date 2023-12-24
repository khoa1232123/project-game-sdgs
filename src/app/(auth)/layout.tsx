"use client";
import LayoutLogin from "@/components/LayoutLogin";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const LayoutAuth = ({ children }: Props) => {
  const router = useRouter();
  const { user } = useCurrentUser();

  useEffect(() => {
    console.log({ user });

    if (user?.uid) {
      router.push("/");
    }
  }, [user]);

  return <LayoutLogin>{children}</LayoutLogin>;
};

export default LayoutAuth;
