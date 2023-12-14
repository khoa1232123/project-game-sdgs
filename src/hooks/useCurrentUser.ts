import { auth } from "@/configs/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useCurrentUser = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);

      console.log({ authUser });

      if (!authUser?.uid) {
        router.push("/login");
      }

      if (
        authUser?.uid &&
        (pathname.indexOf("/login") || pathname.indexOf("/signup"))
      ) {
        router.push("/");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { user };
};
