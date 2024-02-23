interface OrderRequest {
  deliveryAddress: string | undefined;

  paymentId?: string;

  totalPrice: number;

  status: string;

  userId: string | undefined;

  orderItemRequest: OrderItemDto[];
}

interface OrderItemDto {
  quantity: number;

  productId: string | undefined;
  userId?: string | undefined;
}

interface Order {
  id: string | undefined;

  orderDate: Date;

  totalPrice: number | undefined;

  paymentMethodId: string | undefined;

  status: string | undefined;

  deliveryStatus: string | undefined;

  userId: string | undefined;

  orderItems: OrderItemDto[];
}
