"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import "react-toastify/dist/ReactToastify.css";
import FaciliGameList from "./(main)/facili/game_list/page";
import MainLayout from "./(main)/layout";

const Home = () => {
  useCurrentUser();
  
  return (
    <MainLayout>
      <FaciliGameList />
    </MainLayout>
  );
};

export default Home;
