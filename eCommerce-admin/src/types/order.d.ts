interface Order {
  id: string

  userId: string

  cartId: string

  paymentMethodId: string

  isAccept: boolean

  status: string

  totalPrice: number

  orderDate: string
}
