'use client';

import React, { useEffect, useState } from 'react';
import { Menu, Moon, Sun } from 'lucide-react';
import Cookies from 'js-cookie';

import MaxWidthWrapper from '../ui/MaxWidthWrapper';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Button, buttonVariants } from '../ui/button';
import ProfileButton from '../ProfileButton';
import { Separator } from '../ui/separator';
import { useUser } from '@/store/useUser';
import Navbar from './Navbar';
import Cart from '../Cart';
import categoryApi from '@/apis/categoryApi';
import { useCategory } from '@/store/useCategory';
import { useCart } from '@/store/useCart';

export interface Navigation {
  href: string;
  label: string;
  icon: string;
}

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const [isClient, setIsClient] = useState<boolean>(false);
  const { setbaseCategoryInfo, baseCategoryInfo } = useCategory();
  const { userInfo, isLogined } = useUser();
  const { cartProducts, setQty } = useCart();

  useEffect(() => {
    setQty(cartProducts.length);
  }, [cartProducts]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await categoryApi.getBaseCategories();
        setbaseCategoryInfo(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  let categories: Navigation[] = [];

  baseCategoryInfo?.map((category) =>
    categories.push({
      href: category.name.toLocaleLowerCase(),
      label: category.name,
      icon: category.iconUrl.thumbnailUrl,
    })
  );

  const { getCurrentUser } = useUser();

  useEffect(() => {
    getCurrentUser;
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  console.log('userInfo: ===========> ', userInfo);

  return (
    <>
      {/* <NavHead /> */}
      <div className="sticky z-50 top-0 inset-x-0 bg-slate-200 dark:bg-[#020817]">
        <MaxWidthWrapper>
          <div className="relative  flex h-16 items-center justify-between w-full">
            <div className="flex items-center">
              <Sheet>
                <SheetTrigger>
                  <Menu className="h-6 lg:hidden w-6" />
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col gap-4">
                    {categories?.map((category, i) => (
                      <Link
                        key={i}
                        href={category.href}
                        className="block px-2 py-1 text-lg font-bold"
                      >
                        {category.label}
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
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
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
              <div className="hidden md:flex h-full justify-center items-center">
                {isLogined && userInfo ? null : (
                  <Link
                    href="/login"
                    className={buttonVariants({ variant: 'ghost' })}
                  >
                    Sign in
                  </Link>
                )}
                {isLogined && userInfo ? null : (
                  <Separator
                    orientation="vertical"
                    className="h-[24px] w-[1px] bg-slate-700"
                  />
                )}

                {isLogined && userInfo ? (
                  <ProfileButton imageUrl={userInfo?.imageUrl} />
                ) : (
                  <Link
                    href="/register"
                    className={buttonVariants({
                      variant: 'ghost',
                    })}
                  >
                    Create account
                  </Link>
                )}
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
        <Separator />

        <div className=" hidden lg:block">
          <Navbar categories={categories} />
          <Separator />
        </div>
      </div>
    </>
  );
};
