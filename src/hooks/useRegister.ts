import { auth, db } from "@/configs/firebase";
import { RegisterType } from "@/contants/type";
import { User, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";

export const useRegister = () => {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = ({ email, password, displayName }: RegisterType) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (data) => {
        const ref = collection(db, "users");

        await addDoc(ref, {
          email: email,
          displayName: displayName,
          uid: data.user.uid,
        });

        setUser(data.user);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { handleRegister, user, isLoading };
};
