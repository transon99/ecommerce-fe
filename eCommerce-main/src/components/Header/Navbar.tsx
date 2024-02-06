import React, { useEffect, useState } from 'react';
import categoryApi from '@/apis/categoryApi';
import MaxWidthWrapper from '../ui/MaxWidthWrapper';
import NavItems from './NavItems';

const Navbar = () => {
  return (
    <header className="relative ">
      <MaxWidthWrapper>
        <div className="border-b border-gray-200">
          <div className="flex items-center">
            <div className="hidden z-50 lg:block lg:self-stretch">
              {/* <NavItems /> */}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  );
};

export default Navbar;
