"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FaciliGameList from "./(main)/facili/game_list/page";
import MainLayout from "./(main)/layout";

const Home = () => {
  useCurrentUser();
  return (
    <MainLayout>
      <FaciliGameList />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        theme="light"
      />
    </MainLayout>
  );
};

export default Home;
