import { Flex, Text } from '@radix-ui/themes'
import { BsFillBoxSeamFill } from 'react-icons/bs'
import { FaHome, FaShoppingCart, FaUserEdit } from 'react-icons/fa'
import { BiSolidCategory } from 'react-icons/bi'
import { IoTicket } from 'react-icons/io5'
import { FaImage } from 'react-icons/fa'

import { IconType } from 'react-icons'
import { Link, useLocation } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'

import { useAppStore } from '@/store/useAppStore'

function SideBar() {
  interface MenuData {
    Icon: IconType
    href: string
    layble: string
  }

  const menuData: MenuData[] = [
    {
      Icon: FaHome,
      href: '/',
      layble: 'Dashboard'
    },
    {
      Icon: BsFillBoxSeamFill,
      href: '/product',
      layble: 'Product'
    },
    {
      Icon: BiSolidCategory,
      href: '/category',
      layble: 'Category'
    },
    {
      Icon: IoTicket,
      href: '/brand',
      layble: 'Brand'
    },
    {
      Icon: FaShoppingCart,
      href: '/order',
      layble: 'Order'
    },
    {
      Icon: FaUserEdit,
      href: '/user',
      layble: 'User'
    },
    {
      Icon: FaImage,
      href: '/banner',
      layble: 'Banner'
    }
  ]

  const currentPath = useLocation().pathname
  const { isShowSideBar } = useAppStore()
  return (
    <aside
      id='logo-sidebar'
      // className=' z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0'
      className={twMerge('min-w-64 md:block hidden', clsx({ block: isShowSideBar }))}
      aria-label='Sidebar'
    >
      <div className='h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 rounded-lg w-64 '>
        <Flex direction={'column'} className='space-y-2 font-medium'>
          {menuData.map((tab) => (
            <Link
              key={tab.href}
              to={tab.href}
              className={twMerge(
                'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group',
                clsx({
                  'bg-gray-700': tab.href === currentPath,
                  '': tab.href === currentPath
                })
              )}
            >
              <tab.Icon size={20} className='text-gray-400 ' />
              <Text ml={'3'} className=''>
                {tab.layble}
              </Text>
            </Link>
          ))}
        </Flex>
      </div>
    </aside>
  )
}

export default SideBar
