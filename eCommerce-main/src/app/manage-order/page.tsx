import MaxWidthWrapper from '@/components/ui/MaxWidthWrapper';

import ManageOrdersClient from './ManageOrdersClient';

const ManageOrders = () => {
  return (
    <div className="pt-8">
      <MaxWidthWrapper>
        <ManageOrdersClient />
      </MaxWidthWrapper>
    </div>
  );
};

export default ManageOrders;
