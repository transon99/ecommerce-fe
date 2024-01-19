import { Button, Card, Flex, Heading, Text } from '@radix-ui/themes'
import { Link } from 'react-router-dom'
import { AddProductDialog } from './Dialog'

interface Props extends Product {
  categoriesData: Category[]
  brandsData: Brand[]
}

const CardItem = (props: Props) => {
  console.log('props =====>', props)
  const salePrice = (1 - (props?.discount ?? 0) / 100) * (props?.priceUnit ?? 0)
  return (
    <div className='bg-secondary' key={props.id}>
      <Card size='2' className='!bg-secondary text-primary'>
        <Flex direction={'column'} gap={'3'}>
          <img
            src={props?.thumbnailUrls[0]?.thumbnailUrl}
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
                {props.name}
              </Heading>
            </Link>

            <Text as='p' size='3' weight={'medium'} className='text-[#00BA9D] leading-[1.4]'>
              {`Available : ${props.quantity}`}
            </Text>
            {/* <Text as='p' size='3' weight={'medium'} className='text-[#4F89FC] leading-[1.4]'>
              Already sold : 158
            </Text> */}
            <Text as='p' size='3' weight={'medium'} className='text-[#4F89FC] leading-[1.4]'>
              {`Discount : ${props.discount}%`}
            </Text>
            <Text as='p' size='3' weight={'medium'} className='text-white leading-[1.4]'>
              {`Regular price : ${props.priceUnit}`}
            </Text>
            <Text as='p' size='3' weight={'medium'} className='text-white leading-[1.4]'>
              {`Sale price : ${salePrice}`}
            </Text>
          </Flex>
        </Flex>
        <div className='grid grid-cols-2 gap-1.5 mt-4'>
          <AddProductDialog
            varient='EDIT'
            dataProps={props}
            categoriesData={props.categoriesData}
            brandsData={props.brandsData}
          />

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
