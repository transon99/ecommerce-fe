type CategoryRequest = {
  name?: string
  parentCatId?: string
  imageUrls?: any
}

interface Category {
  id?: string | undefined
  name?: string
  baseCategory?: Category | undefined
  imageUrls?: any[]
  iconUrl?: any
}

interface CategoryResponse {
  id?: string | undefined
  name?: string
  baseCategory?: Category | undefined
  imageUrls?: any[]
  iconUrl?: any
  children?: CategoryResponse[]
  parent?: CategoryResponse
}
