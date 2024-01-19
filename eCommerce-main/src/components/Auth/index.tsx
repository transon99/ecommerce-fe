"use client";
import { SessionProvider } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import { Footer } from "../Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "../Header";
import { ToastContainer } from "react-toastify";

const Auth = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ToastContainer position="bottom-right" />
        <Header />
        {children}
        <Footer />
      </ThemeProvider>
    </SessionProvider>
  );
};

export default Auth;
