interface User {
  id: string

  firstName: string

  lastName: string

  imageUrl: string

  email: string

  phone: string

  role: string

  blocked: boolean

  actived: boolean

  addresses: Address[]
}

interface Address {
  id: string

  fullAddress: string

  district: string

  city: string
}
