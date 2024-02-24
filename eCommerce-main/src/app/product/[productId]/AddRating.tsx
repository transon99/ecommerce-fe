"use client";

import reviewApi from "@/apis/reviewApi";
import Heading from "@/components/Heading";
import TextArea from "@/components/Input/TextArea";
import { Button } from "@/components/ui/button";
import { SUCCESS_STATUS } from "@/constant/commonConstant";
import { useUser } from "@/store/useUser";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type AddRatingProps = {
  product: ProductResponse;
};

const AddRating = ({ product }: AddRatingProps) => {
  const { userInfo } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      comment: "",
      rating: 0,
    },
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldTouch: true,
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (data.rating === 0) {
      setIsLoading(false);
      return toast.error("No rating selected");
    }
    const ratingData: ReviewRequest = {
      rate: data.rate,
      content: data.content,
      userId: userInfo?.id,
      productId: product?.id,
    };

    try {
      const res = reviewApi.createReview(ratingData);
      if (res.data.status === SUCCESS_STATUS) {
        toast.success("Rating submitted");
        router.refresh;
        reset;
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
    }
    setIsLoading(false);
  };

  if (!userInfo || !product) return null;

  // if (product.)

  return (
    <div className="flex flex-col gap-2 max-w-[500px]">
      <Heading title="Rate this product" />
      <Rating
        onChange={(event, newValue) => {
          setCustomValue("rate", newValue);
        }}
      />
      <TextArea
        id="content"
        lable="Comment"
        disabled={isLoading}
        register={register}
        placeholder="Add your review"
      />
      <Button onClick={handleSubmit(onSubmit)}>
        {isLoading ? "Loading..." : " Rate Product"}
      </Button>
    </div>
  );
};

export default AddRating;
