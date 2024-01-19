'use client'

import { Card, Flex, Text } from '@radix-ui/themes'
import { HiDotsVertical } from 'react-icons/hi'

const CardOrder = ({ Icon, layble, quantity }: TCardOrderStatus) => {
  return (
    <div className='w-full text-primary'>
      <Card size='2' className='bg-[#171F29]'>
        <Flex direction={'column'} gap={'5'}>
          <div className='  rounded-lg flex justify-between items-center'>
            <div className='p-3 bg-[#4F89FC] rounded-lg'>
              <Icon className='w-6 h-6' color='#171F29' />
            </div>
            <HiDotsVertical className='w-6 h-6' />
          </div>
          <Flex direction={'column'} gap={'1'}>
            <Text weight={'medium'} size={'3'}>
              {layble}
            </Text>
            <Text weight={'bold'} size={'5'}>
              {quantity}
            </Text>
          </Flex>
        </Flex>
      </Card>
    </div>
  )
}

export default CardOrder
