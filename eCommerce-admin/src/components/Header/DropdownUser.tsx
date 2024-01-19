import { Avatar, DropdownMenu, Text } from '@radix-ui/themes'
import { SlLogout } from 'react-icons/sl'
import { IoIosSettings } from 'react-icons/io'
import { FaUserCog } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const DropdownUser = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('userStore')
    navigate('/auth/signin')
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className='cursor-pointer'>
        <Avatar
          className='ml-4'
          src='https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop'
          fallback='A'
          radius='full'
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className='min-w-[248px]'>
        <DropdownMenu.Item className='cursor-pointer'>
          <FaUserCog size={20} />
          <Text size={'3'} weight={'medium'}>
            My Profile
          </Text>
        </DropdownMenu.Item>
        <DropdownMenu.Item className='cursor-pointer'>
          <IoIosSettings size={20} />
          <Text size={'3'} weight={'medium'}>
            Accout Setting
          </Text>
        </DropdownMenu.Item>

        <DropdownMenu.Separator />
        <DropdownMenu.Item className='cursor-pointer gap-5 flex' color='red' onClick={handleLogout}>
          <SlLogout size={20} />
          <Text size={'3'} weight={'medium'}>
            Logout
          </Text>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export default DropdownUser
