"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function Home() {
  useCurrentUser();
  return <div className="h-[100vh]">Welcome</div>;
}
