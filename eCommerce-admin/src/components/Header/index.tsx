// import DarkModeSwitcher from "./DarkModeSwitcher";
import { BellIcon } from '@radix-ui/react-icons'
import { Flex } from '@radix-ui/themes'
import { Link } from 'react-router-dom'

import DropdownUser from './DropdownUser'
import { useAppStore } from '@/store/useAppStore'

const Header = () => {
  const { setShowSideBar } = useAppStore()

  return (
    <header className='sticky top-0 z-40 flex w-full drop-shadow-1 p-4 justify-between bg-gray-800 rounded-md'>
      <Flex justify={'between'} width={'100%'}>
        <button
          data-drawer-target='default-sidebar'
          data-drawer-toggle='default-sidebar'
          aria-controls='default-sidebar'
          type='button'
          className='inline-flex items-center p-2  text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
          onClick={setShowSideBar}
        >
          <span className='sr-only'>Open sidebar</span>
          <svg
            className='w-6 h-6'
            aria-hidden='true'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              clipRule='evenodd'
              fillRule='evenodd'
              d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
            />
          </svg>
        </button>
        <Link to='/' className='flex items-center ps-2.5 '>
          <img src='https://flowbite.com/docs/images/logo.svg' className='h-6 me-3 sm:h-7' alt='Flowbite Logo' />
          <span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white hidden md:block'>
            ADMIN
          </span>
        </Link>
        <Flex align={'center'}>
          <div className='bg-gray-400 bg- p-1 rounded-full'>
            <BellIcon className='h-6 w-6 hover:cursor-pointer' />
          </div>
          <DropdownUser />
        </Flex>
      </Flex>
    </header>
  )
}

export default Header
