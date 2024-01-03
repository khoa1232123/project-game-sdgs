import { auth, db } from "@/configs/firebase";
import { ActionType } from "@/contants/type";
import { User, UserInfo, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useCurrentUser = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>();


  console.log({ user });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      setUser(authUser);

      if (
        !authUser?.uid &&
        !pathname.includes("/player/entry") &&
        !pathname.includes("/player/game") &&
        !pathname.includes("/signup")
      ) {
        router.push("/login");
      }

      if (
        authUser?.uid &&
        (pathname.includes("/login") || pathname.includes("/signup"))
      ) {
        router.push("/");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [pathname, router]);

  return { user };
};
