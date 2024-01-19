type Product = {
  id?: string
  name?: string
  description?: string
  thumbnailUrls?: any
  sku?: string
  priceUnit?: number
  brand?: Brand
  quantity?: number
  category?: Category
  discount?: number
}

type ProductRequest = {
  name?: string
  description?: string
  imageUrls?: any
  sku?: string
  priceUnit?: number
  brandId?: string
  quantity?: number
  categoryId?: string
  discount?: string
}
