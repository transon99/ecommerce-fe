'use client';

import FormWrap from '@/components/FormWrap';
import MaxWidthWrapper from '@/components/ui/MaxWidthWrapper';
import { Button } from '@/components/ui/button';
import routes from '@/routes';
import { useRouter } from 'next/navigation';
import React from 'react';

type CheckoutProps = {};

const CheckoutSuccess = (props: CheckoutProps) => {
  const router = useRouter();

  return (
    <div className="p-8">
      <MaxWidthWrapper>
        <FormWrap>
          <div className="flex items-center flex-col gap-4">
            <div className="text-teal-500 text-center font-semibold">
              Payment Success
            </div>
            <div className="flex items-center justify-center max-w-[220px] w-full">
              <Button onClick={() => router.push(routes.order)}>
                View Your Orders
              </Button>
            </div>
          </div>
        </FormWrap>
      </MaxWidthWrapper>
    </div>
  );
};
export default CheckoutSuccess;
