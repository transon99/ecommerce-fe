'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Navigation } from '.';
import NavItem from './NavItem';
interface NavbarItemProps {
  categories: Navigation[] | undefined;
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
      {categories?.map((item) => (
        <NavItem category={item} key={item.label} />
      ))}
    </div>
  );
};

export default NavItems;
