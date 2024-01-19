import { topDealUsers } from '../../data.ts'

const TopBox = () => {
  return (
    <div className=' 2xl:text-[24px]'>
      <h1 className='mb-5 font-bold text-2xl'>Top Deals</h1>
      <div>
        {topDealUsers.map((user) => (
          <div className='flex items-center justify-between mb-[30px]' key={user.id}>
            <div className='flex gap-5'>
              <img className='w-10 h-10 rounded-full object-cover lg:block' src={user.img} alt='' />
              <div className='flex flex-col gap-[5px]'>
                <span className='text-sm font-medium'>{user.username}</span>
                <span className='text-xs lg:block'>{user.email}</span>
              </div>
            </div>
            <span className='font-medium'>${user.amount}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopBox
