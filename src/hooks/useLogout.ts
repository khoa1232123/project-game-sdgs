import { auth } from "@/configs/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();
  const handleLogout = () => {
    signOut(auth).then(() => {
      router.push("/login");
    });
  };

  return { handleLogout };
};
