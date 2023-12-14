import { auth } from "@/configs/firebase";
import { LoginType } from "@/contants/type";
import { User, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export const useLogin = () => {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = ({ email, password }: LoginType) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((data) => {
        setUser(data.user);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { handleLogin, user, isLoading };
};
