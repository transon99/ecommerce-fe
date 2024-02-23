'use client';

import { ThemeProvider } from '@/components/ThemeProvider';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer';
import { Header } from '../Header';
import UserLogin from './UserLogin';

const Auth = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <UserLogin>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ToastContainer position="bottom-right" />
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </UserLogin>
    </SessionProvider>
  );
};

export default Auth;
