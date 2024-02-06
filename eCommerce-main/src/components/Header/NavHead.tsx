'use client';
import Link from 'next/link';
import MaxWidthWrapper from '../ui/MaxWidthWrapper';
import Navbar from './Navbar';
import ProfileButton from '../ProfileButton';
import { Separator } from '@radix-ui/react-separator';
import { useUser } from '@/store/useUser';
import { Button, buttonVariants } from '../ui/button';
import { FaFacebookF } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaGoogle } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';

export const NavHead = () => {
  const user = useUser((state) => state.userInfo);

  return (
    <>
      <div className="sticky z-50 top-0 inset-x-0 bg-[#EE3131] dark:bg-[#111827] text-white py-3">
        <MaxWidthWrapper>
          <div className="flex justify-between">
            <div className="flex justify-center items-center">
              <p>ORDER ONLINE OR CALL US (+1800) 000 8808</p>
            </div>

            <div className="flex justify-center items-center">
              <div className="hidden md:flex h-full justify-center items-center">
                {user ? null : (
                  <Link
                    href="/login"
                    className={buttonVariants({ variant: 'ghost' })}
                  >
                    Sign in
                  </Link>
                )}
                {user ? null : (
                  <Separator
                    orientation="vertical"
                    className="h-[24px] w-[1px] bg-white"
                  />
                )}

                {user ? (
                  <ProfileButton imageUrl={user?.imageUrl} />
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
              {/* <ProfileButton /> */}
              <Separator
                orientation="vertical"
                className="h-[24px] w-[1px] bg-white"
              />
              <div className="flex justify-center items-center">
                <Link href="/" className="py-1 px-2">
                  <FaFacebookF />
                </Link>
                <Separator
                  orientation="vertical"
                  className="h-[24px] w-[1px] bg-white"
                />
                <Link
                  href="/"
                  className="py-1 px-2
                "
                >
                  <FaTwitter />
                </Link>
                <Separator
                  orientation="vertical"
                  className="h-[24px] w-[1px] bg-white"
                />
                <Link
                  href="/"
                  className="py-1 px-2
                "
                >
                  <FaGoogle />
                </Link>
                <Separator
                  orientation="vertical"
                  className="h-[24px] w-[1px] bg-white"
                />
                <Link
                  href="/"
                  className="py-1 px-2
                "
                >
                  <FaInstagram />
                </Link>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  );
};
