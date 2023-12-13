import { db } from "@/configs/firebase";
import { LoginType } from "@/contants/type";
import { User, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const useLogin = async ({ email, password }: LoginType) => {
  const [user, setUser] = useState<User>();

  const handleLogin = () => {
    signInWithEmailAndPassword(db, email, password).then((data) => {
      setUser(data.user);
    });
  };

  return { handleLogin, user };
};
