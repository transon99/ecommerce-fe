interface Category {
  id: string;
  name: string;
  imageUrls: Image[];
  products?: Product[];
  children?: Category[];
}

interface Image {
  id: string;
  thumbnailUrl: string;
}
