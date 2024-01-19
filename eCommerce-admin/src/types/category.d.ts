type CategoryRequest = {
  name?: string
  parentCatId?: string
  imageUrls?: any
}

interface Category {
  id?: string | undefined
  name?: string
  baseCategory?: string | undefined
  imageUrls?: any[]
  iconUrl?: any
}
