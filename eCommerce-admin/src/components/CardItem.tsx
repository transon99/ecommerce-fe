import { Button, Card, Flex, Heading, Text } from '@radix-ui/themes'
import { Link } from 'react-router-dom'
import { AddProductDialog } from './Dialog'
import EditProductDialog from './Dialog/EditDialog/EditProductDialog'
import productApi from '@/apis/productApi'
import { SUCCESS_STATUS } from '@/constant/commonConstant'
import { formatPrice } from '@/utils/formatPrice'

interface CardItem {
  product: Product
  brandOptions: any[] | undefined
  categoryOptions: any[] | undefined
}

const CardItem = ({ product, brandOptions, categoryOptions }: CardItem) => {
  console.log('product =====>', product)

  const handleDelete = async (id: string | undefined) => {
    const response = await productApi.delete(id)
    if (response.status === SUCCESS_STATUS) {
      window.location.reload()
    }
  }

  return (
    <div className='bg-secondary' key={product.id}>
      <Card size='2' className='!bg-secondary text-primary'>
        <Flex direction={'column'} gap={'3'}>
          <img
            src={product?.imageUrls[0]?.imageUrl}
            alt='Bold typography'
            style={{
              backgroundColor: 'var(--gray-5)'
            }}
            className='rounded-lg aspect-square block object-cover'
          />
          <Flex direction={'column'} gap={'2'}>
            <Link to='/'>
              <Heading as='h3' className='text-base'>
                {product.name}
              </Heading>
            </Link>

            <Text as='p' size='3' weight={'medium'} className='text-[#00BA9D] leading-[1.4]'>
              {`Available : ${product.quantity}`}
            </Text>
            <Text as='p' size='3' weight={'medium'} className='text-[#4F89FC] leading-[1.4]'>
              {`Discount : ${product.discount}%`}
            </Text>
            <Text as='p' size='3' weight={'medium'} className='text-white leading-[1.4]'>
              {`Regular price : ${product.price}`}
            </Text>
            <Text as='p' size='3' weight={'medium'} className='text-white leading-[1.4]'>
              {`Sale price : ${formatPrice(product?.salePrice)}`}
            </Text>
          </Flex>
        </Flex>
        <div className='grid grid-cols-2 gap-4 mt-4'>
          <EditProductDialog productId={product.id} categoryOptions={categoryOptions} brandOptions={brandOptions} />

          <Button
            variant='outline'
            color='red'
            radius='full'
            className='hover:cursor-pointer hover:bg-[#FF5470] hover:text-white col'
            onClick={() => handleDelete(product.id)}
          >
            Delete
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default CardItem
