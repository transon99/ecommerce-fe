interface Product {
  id: string;
  name: string;
  description: string;
  sku: string;
  price: number;
  quantity: number;
  brand: Brand;
  category: Category;
  imageUrls: string[];
}
