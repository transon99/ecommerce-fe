interface CheckoutRequest {
  paymentMethod: string;
  totalPrice?: number;
  stripeRequest: StripeRequest;
}

interface StripeItem {
  productName: string;
  quantity: number;
  price: number;
  productId: string | undefined;
  userId?: string | undefined;
}

interface StripeRequest {
  stripeItemList: StripeItem[];
  orderId?: string | undefined;
}
