"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import Cookies from "js-cookie";
// import { toast } from "react-toastify";

import routes from "@/routes";
import { useRouter } from "next/navigation";
import { useUser } from "@/store/useUser";
import authApi from "@/apis/authApi";

const UserLogin = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const userId = useUser((state) => state.userId);

  useEffect(() => {
    const login = async () => {
      try {
        if (session && session.accessToken) {
          if (!userId) {
            const result = await authApi.(session.id_token);
            console.log("🚀 ~ file: index.jsx:31 ~ login ~ result:", result);

            if ("password" in result && !result.password) {
              Cookies.set("accessToken", result.accessToken, {
                expires: 100,
              });
              Cookies.set("refreshToken", result.refreshToken, {
                expires: 100,
              });
              setShowModal(true);
              return;
            }
            if ("public" in result && !result.public) {
              dispatch(setEmailRecover(session.user.email));
              return;
            }
            dispatch(setUser(result));
            toast.success("Login successfully.");

            Cookies.set("accessToken", result.accessToken, {
              expires: 100,
            });
            Cookies.set("refreshToken", result.refreshToken, {
              expires: 100,
            });
          }
        }
        const accessToken = Cookies.get("accessToken");
        if (!accessToken) {
          dispatch(resetUser());
        }
      } catch (error) {
        console.log("🚀 ~ file: index.jsx:65 ~ login ~ error:", error);
        toast.error("Login error. Please try again later.");
        // signOut();
        dispatch(resetUser());
      }
    };
    login();
  }, [session]);

  return <>{children}</>;
};

export default UserLogin;
