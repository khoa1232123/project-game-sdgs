"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  useCurrentUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
        </header>
        {children}
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
      </body>
    </html>
  );
};

export default RootLayout;
