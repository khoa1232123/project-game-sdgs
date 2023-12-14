"use client";
import { auth } from "@/configs/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

const Logout = (props: Props) => {
  const router = useRouter();
  useEffect(() => {
    signOut(auth).then(() => {
      router.push("/login");
    });
  }, []);

  return <div>Logout</div>;
};

export default Logout;
