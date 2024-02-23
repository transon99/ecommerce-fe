interface Product {
  id: string;
  name: string | undefined;
  description: string | undefined;
  category: Category;
  brand: Brand;
  thumbnailUrls: ImageUrl[];
  price: number;
  salePrice: number;
  quantity: number;
  rate: number;
}

interface ImageUrl {
  id: string;
  thumbnailUrl: string;
}

interface ProductResponse {
  id: string;
  name: string;
  description: string;
  categoryDTO: Category;
  brandDTO: Brand;
  imageUrls: ImageUrl[];
  price: number;
  salePrice: number;
  quantity: number;
  discount: number;
  rate: number;
}
