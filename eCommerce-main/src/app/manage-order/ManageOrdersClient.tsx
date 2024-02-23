'use client';

import orderApi from '@/apis/orderApi';
import ActionBtn from '@/components/ActionBtn';
import Heading from '@/components/Heading';
import NullData from '@/components/NullData';
import Status from '@/components/Status';
import { formatPrice } from '@/lib/formatPrice';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  MdAccessTimeFilled,
  MdCancel,
  MdDeliveryDining,
  MdDone,
  MdRemoveRedEye,
} from 'react-icons/md';

interface ManageOrdersClientProps {
  orders: Order[];
}

const ManageOrdersClient = () => {
  const router = useRouter();
  const [orderList, setOrderList] = useState<Order[]>([]);

  useEffect(() => {
    const getOrderOfCurrentUser = async () => {
      const response = await orderApi.getOrderOfCurrentUser();
      setOrderList(response.data);
    };
    getOrderOfCurrentUser();
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 220 },
    {
      field: 'amount',
      headerName: 'Amount(USD)',
      width: 130,
      renderCell: (param) => {
        return (
          <div className="font-bold text-slate-800">
            {formatPrice(param.row.totalPrice)}
          </div>
        );
      },
    },
    {
      field: 'deliveryStatus',
      headerName: 'Delivery Status',
      width: 150,
      renderCell: (param) => {
        return (
          <div>
            {param.row.deliveryStatus === 'PENDING' ? (
              <Status
                text="pending"
                icon={MdAccessTimeFilled}
                bg="bg-slate-200"
                color="text-slate-700"
              />
            ) : param.row.deliveryStatus === 'DISPATCHED' ? (
              <Status
                text="dispatch"
                icon={MdDeliveryDining}
                bg="bg-purple-200"
                color="text-purple-700"
              />
            ) : param.row.deliveryStatus === 'DELIVERED' ? (
              <Status
                text="delivered"
                icon={MdDone}
                bg="bg-green-200"
                color="text-green-700"
              />
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    {
      field: 'status',
      type: 'string',
      headerName: 'Order Status',
      width: 150,
      renderCell: (param) => {
        return (
          <div>
            {param.row.status === 'PENDING' ? (
              <Status
                text="pending"
                icon={MdAccessTimeFilled}
                bg="bg-slate-200"
                color="text-slate-700"
              />
            ) : param.row.status === 'COMPLETED' ? (
              <Status
                text="completed"
                icon={MdDone}
                bg="bg-green-200"
                color="text-green-700"
              />
            ) : param.row.status === 'CANCEL' ? (
              <Status
                text="cancel"
                icon={MdCancel}
                bg="bg-green-200"
                color="text-green-700"
              />
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    {
      field: 'orderDate',
      headerName: 'Order Date',
      width: 200,
      type: 'string',
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (param) => {
        console.log('param: ', param);
        return (
          <div className="flex justify-between gap-4 w-full">
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                // console.log(`order/${param.row.id}`);
                router.push(`order/${param.row.id}`);
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Manage Orders" />
      </div>
      <div>
        {orderList?.length === 0 ? (
          <NullData title="DON'T HAVE ANY ORDER YET" />
        ) : (
          <DataGrid
            className="bg-white p-5"
            rows={orderList}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            disableColumnFilter
            disableDensitySelector
            disableColumnSelector
          />
        )}
      </div>
    </div>
  );
};

export default ManageOrdersClient;
