"use client";

import React, { useEffect, useState } from "react";
import { Menu, Moon, ShoppingCart, Sun } from "lucide-react";

import MaxWidthWrapper from "../ui/MaxWidthWrapper";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import ProfileButton from "../ProfileButton";
import { Separator } from "../ui/separator";
import Cart from "../Cart";
import { useUser } from "@/store/useUser";
import Navbar from "./Navbar";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const [isClient, setIsClient] = useState<boolean>(false);
  const user = useUser((state) => state.userInfo);

  const { getCurrentUser } = useUser();

  useEffect(() => {
    getCurrentUser;
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const routes = [
    {
      href: "/",
      label: "Products",
    },
    {
      href: "/",
      label: "Categories",
    },
    {
      href: "/",
      label: "On Sale",
    },
  ];

  return (
    <>
      <div className="sticky z-50 top-0 inset-x-0 bg-white dark:bg-[#020817]">
        <MaxWidthWrapper>
          <div className="relative  flex h-16 items-center justify-between w-full">
            <div className="flex items-center">
              <Sheet>
                <SheetTrigger>
                  <Menu className="h-6 lg:hidden w-6" />
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col gap-4">
                    {routes.map((route, i) => (
                      <Link
                        key={i}
                        href={route.href}
                        className="block px-2 py-1 text-lg"
                      >
                        {route.label}
                      </Link>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
              <Link href="/" className="ml-4 lg:ml-0">
                <h1 className="text-xl font-bold">SG Shop</h1>
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle Theme"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle Theme</span>
              </Button>
              <div
                className=" hover:bg-slate-200 rounded-full p-1"
                aria-label="Shopping Cart"
              >
                {isClient && <Cart />}
                <span className="sr-only">Shopping Cart</span>
              </div>
              <div className="hidden md:flex h-full">
                {user ? null : (
                  <Link
                    href="/login"
                    className={buttonVariants({ variant: "ghost" })}
                  >
                    Sign in
                  </Link>
                )}
                {user ? null : (
                  <Separator orientation="vertical" className="h-[40px]" />
                )}

                {user ? (
                  <ProfileButton imageUrl={user?.imageUrl} />
                ) : (
                  <Link
                    href="/register"
                    className={buttonVariants({
                      variant: "ghost",
                    })}
                  >
                    Create account
                  </Link>
                )}
              </div>
              {/* <ProfileButton /> */}
            </div>
          </div>
        </MaxWidthWrapper>
        <Separator />

        <Navbar />
        <Separator />
      </div>
    </>
  );
};
