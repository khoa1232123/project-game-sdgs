import { auth, db } from "@/configs/firebase";
import { ActionType, RegisterType } from "@/contants/type";
import { User, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";

export const useRegister = () => {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = ({ email, password, displayName }: RegisterType) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (data) => {
        const ref = collection(db, ActionType.USERS);

        await updateProfile(data.user, {
          displayName: displayName
        });

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
