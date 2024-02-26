'use client';

import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { Navigation } from '.';
import Link from 'next/link';

interface NavItemProps {
  category: Navigation;
}

const NavItem = ({ category }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(`/category/${category.name}`);
  return (
    <Link
      href={{
        pathname: `/category/${category.name}`,
        query: { id: category.href },
      }}
      className={`flex items-center justify-center text-center gap-1 p-2 border-b-2 hover:text-slate-800 cursor-pointer ${
        isActive
          ? 'border-b-slate-800 text:slate-800'
          : 'border-transparent text-slate-500'
      }`}
    >
      <Image src={category.icon} alt={category.label} width={20} height={20} />
      <div className="font-medium text-sm">{category.label}</div>
    </Link>
  );
};

export default NavItem;
