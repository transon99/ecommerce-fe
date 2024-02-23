import { getBaseCategoryAction } from '@/action/CategoryAction';
import { getProductByCategory } from '@/action/ProductAction';
import { Hero } from '@/components/Hero';
import ProductReel from '@/components/ProductReel';
import MaxWidthWrapper from '@/components/ui/MaxWidthWrapper';

const heroData: string[] = ['', '', ''];
interface ProductReel {
  title: string;
  href: string;
  products: Product[] | undefined;
}

export default async function Home() {
  const baseCatListRes = await getBaseCategoryAction();

  let productReels: ProductReel[] = [];

  baseCatListRes.data.map((category: Category) => {
    productReels?.push({
      title: category.name,
      href: `/${category.id}`,
      products: category.products,
    });
  });

  console.log('productReels', productReels);

  return (
    <>
      <MaxWidthWrapper>
        {/* <Hero urls={heroData} /> */}
        {productReels.map((item) => (
          <ProductReel
            key={item.title}
            title={item.title}
            href={item.href}
            products={item.products}
          />
        ))}
      </MaxWidthWrapper>
    </>
  );
}
