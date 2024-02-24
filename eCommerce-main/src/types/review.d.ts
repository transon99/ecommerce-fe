interface Review {
  id: string;

  rate: number;

  content: string;

  user: UserInfo;

  product: Product;

  createDate: Date;
}

interface ReviewRequest {
  rate: number | undefined;

  content: string | undefined;

  userId: string | undefined;

  productId: string | undefined;
}
