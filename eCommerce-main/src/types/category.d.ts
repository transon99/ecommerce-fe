interface Category {
  id: string;
  name: string;
  imageUrls: Image[];
  iconUrl: Image;
  products?: Product[];
  children?: Category[];
}

interface Image {
  id: string;
  thumbnailUrl: string;
}
