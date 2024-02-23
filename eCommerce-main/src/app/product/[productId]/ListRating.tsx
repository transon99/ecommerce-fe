'use client';

import Heading from '@/components/Heading';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Rating } from '@mui/material';

import moment from 'moment';

type ListRatingProps = {
  reviews: Review[];
};

const ListRating = ({ reviews }: ListRatingProps) => {
  return (
    <div>
      <Heading title="Product Review" />
      <div className="text-sm mt-2">
        {reviews &&
          reviews.map((review: Review) => {
            return (
              <div key={review.id} className="max-w-[300px]">
                <div className="flex gap-2 items-center">
                  <Avatar>
                    <AvatarImage src={review?.user?.imageUrl} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="font-semibold">
                    {review?.user?.firstName + review?.user?.lastName}
                  </div>
                  <div className="font-light">
                    {moment(review.createDate).fromNow()}
                  </div>
                </div>
                <div className="mt-2">
                  <Rating value={review.rate} readOnly />
                  <div className="ml-2">{review.content}</div>
                  <hr className="mt-4 mb-4" />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ListRating;
