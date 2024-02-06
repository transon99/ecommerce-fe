import MaxWidthWrapper from '@/components/ui/MaxWidthWrapper';
import Link from 'next/link';
import ProductDetail from './ProductDetail';
import ListRating from './ListRating';

interface PageProps {
  params: {
    productId: string;
  };
}

const BREADCRUMBS = [
  { id: 1, name: 'Home', href: '/' },
  { id: 2, name: 'Products', href: '/products' },
];

const product: Product = {
  id: 'id1',
  name: 'Product 1',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at augue eget nisl ullamcorper mattis. In eu semper libero. Vestibulum vel justo eu nulla congue elementum. Integer auctor bibendum quam, sit amet cursus justo malesuada vel. Proin varius libero a tortor venenatis, ut fringilla augue dictum. Suspendisse potenti. Sed bibendum turpis ut massa ultricies, a rhoncus erat tincidunt. Sed id commodo purus. Nullam hendrerit ipsum sit amet urna tincidunt, vel rhoncus lectus consequat. Curabitur aliquet eros vitae justo aliquet, vel malesuada nunc lacinia. In hac habitasse platea dictumst. Curabitur auctor vestibulum lorem, ut suscipit libero aliquam nec. Nullam eu neque vel ex bibendum euismod. Integer vulputate varius velit, in luctus nulla efficitur vitae.',
  imageUrls: [
    {
      id: '1',
      thumbnailUrl: 'https://kccshop.vn/media/product/75-5547-1.jpg',
    },
    {
      id: '2',
      thumbnailUrl: 'https://kccshop.vn/media/product/75-5547-2.jpg',
    },
    {
      id: '3',
      thumbnailUrl: 'https://kccshop.vn/media/product/75-5547-3.jpg',
    },
    {
      id: '4',
      thumbnailUrl: 'https://kccshop.vn/media/product/75-5547-5.jpg',
    },
  ],
  quantity: 10,
  category: {
    id: 'id1',
    name: 'Category 1',
    imageUrls: [
      {
        id: 'id2',
        thumbnailUrl: '',
      },
    ],
  },
  brand: {
    id: 'id1',
    name: 'Brand 1',
    imageUrl: '',
  },
  price: 100,
  salePrice: 85,
  rate: 2,
};

const reviews: Review[] = [
  {
    id: 'id1',
    content: 'San pham oke',
    product: {},
    rate: 4,
    user: {
      id: 'id2',
      firstName: 'Tran',
      lastName: 'Son',
    },
    createdAt: new Date(2024, 1, 7),
  },
  {
    id: 'id1',
    content: 'San pham nhu cc',
    product: {},
    rate: 4,
    user: {
      id: 'id2',
      firstName: 'Tran',
      lastName: 'Dang',
    },
    createdAt: new Date(2024, 1, 7),
  },
];

const ProductDetailPage = async ({ params }: PageProps) => {
  const { productId } = params;

  //   const product = await getProductById(productId);
  console.log('productId');

  return (
    <>
      <MaxWidthWrapper>
        <div className="py-5">
          <ol className="flex items-center space-x-2">
            {BREADCRUMBS.map((breadcrumb, i) => (
              <li key={breadcrumb.href}>
                <div className="flex items-center text-sm">
                  <Link
                    href={breadcrumb.href}
                    className="font-medium text-sm text-muted-foreground hover:text-gray-900"
                  >
                    {breadcrumb.name}
                  </Link>
                  {i !== BREADCRUMBS.length - 1 ? (
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                    >
                      <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                    </svg>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
          <ProductDetail product={product} />
          <div className="flex flex-col mt-20 gap-4">
            <div>Add Rating</div>
            <ListRating reviews={reviews} />
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default ProductDetailPage;
