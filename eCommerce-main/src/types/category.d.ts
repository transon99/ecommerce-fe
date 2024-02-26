interface Category {
  id: string;
  name: string;
  imageUrls: Image[];
  iconUrl: Image;
  products?: ProductResponse[];
  children?: Category[];
}

interface Image {
  id: string;
  imageUrl: string;
}
