import MaxWidthWrapper from '@/components/ui/MaxWidthWrapper';
import { getProductById } from '@/action/ProductAction';
import { cookies } from 'next/headers';
import axios from 'axios';
import { API_URL_ORDER } from '@/constant/apiConstant';
import OrderDetail from './OrderDetail';
interface PageProps {
  orderId?: string;
}

const url = API_URL_ORDER;

const OrderDetailPage = async ({ params }: { params: PageProps }) => {
  console.log('userId', params?.orderId);

  return (
    <div>
      <MaxWidthWrapper>
        <div className="py-5">
          <OrderDetail orderId={params?.orderId?.toString()} />
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default OrderDetailPage;
