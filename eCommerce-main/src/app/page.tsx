import { getAllBanner } from '@/action/BannerAction';
import { getBaseCategoryAction } from '@/action/CategoryAction';
import { getProductByCategory } from '@/action/ProductAction';
import { Banner, Hero } from '@/components/Hero';
import ProductReel from '@/components/ProductReel';
import MaxWidthWrapper from '@/components/ui/MaxWidthWrapper';

const heroData: string[] = ['', '', ''];
interface ProductReel {
  title: string;
  href: string;
  products: ProductResponse[] | undefined;
}

export default async function Home() {
  const baseCatListRes = await getBaseCategoryAction();
  const bannerData = await getAllBanner();

  const productReels: ProductReel[] = baseCatListRes.data.map(
    (category: Category) => {
      return {
        title: category.name,
        href: `category/${category.name}?id=${category.id}`,
        products: category.products,
      };
    }
  );

  console.log('bannerData =========>', bannerData);

  return (
    <>
      <Banner banners={bannerData.data} />
      <MaxWidthWrapper>
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
