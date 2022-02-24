import React, { useRef } from 'react'
import { LineChart } from '@opd/g2plot-react'
import {dateToTimestamp} from '../utilities'

const StreakLineChart = ({ streak }) => {

  let data = []

  streak.forEach(item => {
    data.push({
      "date": item[0],
      "tweets": item[1]
    })
  })

  data = data.sort((a, b) => dateToTimestamp(a.date) - dateToTimestamp(b.date))
  // console.log(data)

  const config = {
    height: 350,
    autoFit: true,
    xField: 'date',
    yField: 'tweets',
    smooth: true,
    meta: {
      value: {
        max: 15,
      },
    },
    data: data,
  }

  const chartRef = useRef()
  return <div className='flex my-3 justify-between m-auto p-3 m-full sm:w-9/12 flex-col'>
    <h2 className='text-2xl font-bold my-3 text-gray-600'>Tweeting Streak(Last Seven Days)</h2>
    <LineChart {...config} chartRef={chartRef} />
  </div>
}

export default StreakLineChart