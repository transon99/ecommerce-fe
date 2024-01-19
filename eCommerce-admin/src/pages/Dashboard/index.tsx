import ChartBox from '@/components/ChartBox/ChartBox'
import {
  barChartBoxRevenue,
  barChartBoxVisit,
  chartBoxOrder,
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser
} from '../../data'

import { PiUsersBold } from 'react-icons/pi'
import { FaBoxes } from 'react-icons/fa'
import { FaMoneyCheckDollar } from 'react-icons/fa6'
import { FaShoppingCart } from 'react-icons/fa'
import PieChartBox from '@/components/pieChartBox/pieChartBox'
import BarChartBox from '@/components/barChart/barChartBox'
import BigChartBox from '@/components/bigChartBox/bigChartBox'
import TopBox from '@/components/TopBox/TopBox'

const Dashboard = () => {
  return (
    <div className='h-[calc(100vh-88px)] overflow-auto'>
      <div className='p-5 grid gap-5 overflow-hidden grid-cols-1  xl:grid-cols-4 auto-rows-[minmax(180px,auto)] text-white'>
        <div className='p-5 rounded-xl bg-[#171F29] xl:row-span-3 xl:col-span-1'>
          <TopBox />
        </div>
        <div className='p-5 rounded-xl bg-[#171F29]'>
          {' '}
          <ChartBox {...chartBoxUser} Icon={PiUsersBold} />
        </div>
        <div className='p-5 rounded-xl bg-[#171F29]'>
          <ChartBox {...chartBoxProduct} Icon={FaBoxes} />
        </div>
        <div className='p-5 rounded-xl bg-[#171F29] xl:col-span-1 xl:row-span-2 flex justify-between items-center flex-col'>
          <PieChartBox />
        </div>
        <div className='p-5 rounded-xl bg-[#171F29] '>
          {' '}
          <ChartBox {...chartBoxRevenue} Icon={FaMoneyCheckDollar} />
        </div>
        <div className='p-5 rounded-xl bg-[#171F29] '>
          {' '}
          <ChartBox {...chartBoxOrder} Icon={FaShoppingCart} />
        </div>
        <div className='p-5 rounded-xl bg-[#171F29] xl:col-span-3 xl:row-span-2'>
          {/* <p className='ali'>Sold by category</p>
          <PieChartBox /> */}
          <BigChartBox />
        </div>
        <div className='p-5 rounded-xl bg-[#171F29] '>
          <BarChartBox {...barChartBoxVisit} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
