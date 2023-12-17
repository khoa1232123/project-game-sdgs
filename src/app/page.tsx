"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import MainLayout from "./(main)/layout";
import FaciliGameList from "./(main)/facili/game_list/page";

export default function Home() {
  useCurrentUser();
  return (
    <MainLayout>
      <FaciliGameList />
    </MainLayout>
  );
}
