import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const data = [
  { name: 'Quarter I', value: 400, color: '#0088FE' },
  { name: 'Quarter II', value: 300, color: '#00C49F' },
  { name: 'Quarter III', value: 300, color: '#FFBB28' },
  { name: 'Quarter IV', value: 200, color: '#FF8042' }
]

const PieChartBox = () => {
  let halfLength = Math.ceil(data.length / 2)
  let firstHalf = data.slice(0, halfLength)
  let secondHalf = data.slice(halfLength)
  return (
    <div className='flex flex-col h-full justify-between '>
      <p className='font-bold text-2xl'>Sold by brand</p>
      <div className='flex items-center justify-center w-full h-full'>
        <ResponsiveContainer width='99%' height={300}>
          <PieChart>
            <Tooltip contentStyle={{ background: 'white', borderRadius: '5px' }} />
            <Pie data={data} innerRadius={'70%'} outerRadius={'90%'} paddingAngle={5} dataKey='value'>
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className='flex  justify-evenly gap-2 text-[14px] '>
        {firstHalf.map((item) => (
          <div className='flex  gap-3 items-center overflow-hidden' key={item.name}>
            <div className='flex gap-3 items-center'>
              <div className='w-[10px] h-[10px] rounded-full' style={{ backgroundColor: item.color }} />
              <span>{item.name}</span>
            </div>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
      <div className='flex  justify-evenly gap-2 text-[14px] '>
        {secondHalf.map((item) => (
          <div className='flex  gap-3 items-center' key={item.name}>
            <div className='flex gap-3 items-center'>
              <div className='w-[10px] h-[10px] rounded-full' style={{ backgroundColor: item.color }} />
              <span>{item.name}</span>
            </div>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PieChartBox
