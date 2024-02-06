interface Review {
  id: string;

  rate: number;

  content: string;

  user: UserInfo;

  product: Product;

  createdAt: Date;
}
