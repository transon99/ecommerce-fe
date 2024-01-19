import { Header, SideBar } from '@/components'
import { Flex } from '@radix-ui/themes'
import { Outlet } from 'react-router-dom'

const DefaultLayout = () => {
  return (
    <Flex direction={'column'} className='w-full bg-black'>
      <Header />
      <Flex gap={'3'} className='md:m-2 mt-2 h-[calc(100vh-88px)]'>
        <SideBar />
        <main className=' bg-gray-800 rounded-lg w-full overflow-auto'>
          <Outlet />
        </main>
      </Flex>
    </Flex>
  )
}

export default DefaultLayout
