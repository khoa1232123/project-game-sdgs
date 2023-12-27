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

      if (
        !authUser?.uid &&
        !pathname.includes("/player/entry") &&
        !pathname.includes("/player/game")
      ) {
        router.push("/login");
      }

      if (
        authUser?.uid &&
        (pathname.includes("/login") || pathname.includes("/signup"))
      ) {
        console.log("def");
        router.push("/");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [pathname, router]);

  return { user };
};
