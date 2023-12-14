import { auth, db } from "@/configs/firebase";
import { RegisterType } from "@/contants/type";
import { User, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";

export const useRegister = () => {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = ({ email, password }: RegisterType) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (data) => {
        const ref = collection(db, "users");

        await addDoc(ref, {
          email: data.user.email || null,
          displayName: data.user.displayName || null,
          emailVerified: data.user.emailVerified || null,
          isAnonymous: data.user.isAnonymous || null,
          metadata: data.user.metadata || null,
          phoneNumber: data.user.phoneNumber || null,
          photoURL: data.user.photoURL || null,
          refreshToken: data.user.refreshToken || null,
          uid: data.user.uid || null,
        });

        setUser(data.user);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { handleRegister, user, isLoading };
};
