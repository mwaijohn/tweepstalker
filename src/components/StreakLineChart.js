import React, { useRef } from 'react'
import { LineChart, LineChartProps } from '@opd/g2plot-react'

const config = {
  height: 350,
  autoFit: true,
  xField: 'year',
  yField: 'value',
  smooth: true,
  meta: {
    value: {
      max: 15,
    },
  },
  data: [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 11 },
  ],
}

export default () => {
  const chartRef = useRef()
  return <div className='flex my-3 justify-between m-auto p-3 m-full sm:w-9/12 flex-col'>
    <h2 className='text-2xl font-bold my-3 text-gray-600'>Tweeting Streak</h2>
    <LineChart {...config} chartRef={chartRef} />
  </div>
}