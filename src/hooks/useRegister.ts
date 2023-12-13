import { db } from "@/configs/firebase";
import { RegisterType } from "@/contants/type";
import { User, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export const useRegister = ({ email, password }: RegisterType) => {
  const [user, setUser] = useState<User>();

  const handleRegister = () => {
    createUserWithEmailAndPassword(db, email, password).then((data) => {
      setUser(data.user);
    });
  };

  return { handleRegister, user };
};
