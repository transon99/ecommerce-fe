// interface Order {
//   id: string

//   userId: string

//   cartId: string

//   paymentMethodId: string

//   isAccept: boolean

//   status: string

//   totalPrice: number

//   orderDate: string
// }

interface OrderItemDto {
  quantity: number

  productId: string | undefined
  userId?: string | undefined
}

interface Order {
  id: string | undefined

  orderDate: Date

  totalPrice: number | undefined

  paymentMethodId: string | undefined

  status: string | undefined

  deliveryStatus: string | undefined

  userId: string | undefined

  orderItems: OrderItemDto[]
}
