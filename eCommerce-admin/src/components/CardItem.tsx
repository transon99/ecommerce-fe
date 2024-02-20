import { Button, Card, Flex, Heading, Text } from '@radix-ui/themes'
import { Link } from 'react-router-dom'
import { AddProductDialog } from './Dialog'
import EditProductDialog from './Dialog/EditDialog/EditProductDialog'

interface CardItem {
  product: Product
  brandOptions: any[] | undefined
  categoryOptions: any[] | undefined
}

const CardItem = ({ product, brandOptions, categoryOptions }: CardItem) => {
  console.log('product =====>', product)
  const salePrice = (1 - (product?.discount ?? 0) / 100) * (product?.price ?? 0)
  return (
    <div className='bg-secondary' key={product.id}>
      <Card size='2' className='!bg-secondary text-primary'>
        <Flex direction={'column'} gap={'3'}>
          <img
            src={product?.thumbnailUrls[0]?.thumbnailUrl}
            alt='Bold typography'
            style={{
              display: 'block',
              objectFit: 'cover',
              width: '100%',
              height: 140,
              backgroundColor: 'var(--gray-5)'
            }}
            className='rounded-lg'
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
            {/* <Text as='p' size='3' weight={'medium'} className='text-[#4F89FC] leading-[1.4]'>
              Already sold : 158
            </Text> */}
            <Text as='p' size='3' weight={'medium'} className='text-[#4F89FC] leading-[1.4]'>
              {`Discount : ${product.discount}%`}
            </Text>
            <Text as='p' size='3' weight={'medium'} className='text-white leading-[1.4]'>
              {`Regular price : ${product.price}`}
            </Text>
            <Text as='p' size='3' weight={'medium'} className='text-white leading-[1.4]'>
              {`Sale price : ${salePrice}`}
            </Text>
          </Flex>
        </Flex>
        <div className='grid grid-cols-2 gap-1.5 mt-4'>
          <EditProductDialog productId={product.id} categoryOptions={categoryOptions} brandOptions={brandOptions} />

          <Button
            variant='outline'
            color='red'
            radius='full'
            className='hover:cursor-pointer hover:bg-[#FF5470] hover:text-white col'
          >
            Delete
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default CardItem
