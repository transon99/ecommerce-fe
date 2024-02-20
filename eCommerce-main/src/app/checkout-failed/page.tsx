import FormWrap from "@/components/FormWrap";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

type CheckoutProps = {};

const CheckoutFail = (props: CheckoutProps) => {
  const router = useRouter();

  return (
    <div className="p-8">
      <MaxWidthWrapper>
        <FormWrap>
          <div className="flex items-center flex-col gap-4">
            <div className="text-red-500 text-center">Something went wrong</div>
            <div className="max-w-[220px] w-full">
              <Button onClick={() => router.push("/order")}>
                Go to the shopping cart
              </Button>
            </div>
          </div>
        </FormWrap>
      </MaxWidthWrapper>
    </div>
  );
};
export default CheckoutFail;
