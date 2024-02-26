'use client';
import { useEffect } from 'react';

import Cookies from 'js-cookie';
import userApi from '@/apis/userApi';
import { useUser } from '@/store/useUser';
import { useCategory } from '@/store/useCategory';
import categoryApi from '@/apis/categoryApi';

const UserLogin = ({ children }: { children: React.ReactNode }) => {
  const { setCurrentUser, isLogined, setIsLogined } = useUser();
  const { setbaseCategoryInfo } = useCategory();

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

  useEffect(() => {
    const isLoginedCookies = Cookies.get('isLogined');
    if (isLoginedCookies !== undefined) {
      const isLoginedCookiesParse = JSON.parse(isLoginedCookies);
      setIsLogined(isLoginedCookiesParse);
    }
  }, []);

  useEffect(() => {
    const isLoginedCookies = Cookies.get('isLogined');
    if (isLoginedCookies !== undefined) {
      const isLoginedCookiesParse = JSON.parse(isLoginedCookies);
      setIsLogined(isLoginedCookiesParse);
    }
  }, []);

  useEffect(() => {
    const handAuth = async () => {
      const response = await userApi.getCurrentUser();
      if (response.status !== 401) {
        Cookies.set('userInfo', JSON.stringify(response.data));
        const userInfoCookie = Cookies.get('userInfo');

        if (userInfoCookie !== undefined) {
          const userInfo = JSON.parse(userInfoCookie);
          setCurrentUser(userInfo);
        } else {
          console.error('userInfo cookie is undefined');
        }
      }
    };
    handAuth();
  }, [isLogined]);

  return <>{children}</>;
};

export default UserLogin;
