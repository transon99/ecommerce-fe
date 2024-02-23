'use client';
import { Navigation } from '.';
import MaxWidthWrapper from '../ui/MaxWidthWrapper';
import NavItems from './NavItems';
interface NavbarProps {
  categories: Navigation[];
}

const Navbar = ({ categories }: NavbarProps) => {
  return (
    <header className="relative bg-white">
      <MaxWidthWrapper>
        <div className=" border-b-gray-200">
          <NavItems categories={categories} />
        </div>
      </MaxWidthWrapper>
    </header>
  );
};

export default Navbar;
