'use client';

import { useUser } from '@/store/useUser';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

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
      comment: '',
      rating: 0,
    },
  });

  return <div>AddRating</div>;
};

export default AddRating;
