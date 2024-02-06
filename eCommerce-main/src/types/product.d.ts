interface Product {
  id: string;
  name: string;
  description: string;
  category: Category;
  brand: Brand;
  imageUrls: ImageUrl[];
  price: number;
  salePrice: number;
  quantity: number;
  rate: number;
}

interface ImageUrl {
  id: string;
  thumbnailUrl: string;
}
