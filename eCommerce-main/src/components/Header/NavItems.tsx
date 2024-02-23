'use client';

import { useEffect, useRef, useState } from 'react';
import NavItem from './NavItem';
import { useOnClickOutside } from '@/hooks/use-click-outside';
import categoryApi from '@/apis/categoryApi';
import { Navigation } from '.';
import MaxWidthWrapper from '../ui/MaxWidthWrapper';
import { usePathname, useSearchParams } from 'next/navigation';
interface NavbarItemProps {
  categories: Navigation[];
}

const NavItems = ({ categories }: NavbarItemProps) => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);

  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();

  // const isMainPage = pathname === '/';

  // if (!isMainPage) return null;

  return (
    <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
      {categories.map((item) => (
        <NavItem
          category={item}
          selected={
            category === item.label ||
            (category === null && item.label === 'All')
          }
          key={item.label}
        />
      ))}
    </div>
  );
};

export default NavItems;
