import React from 'react'
import {stepsData} from '../assets/assets'
const Steps = () => {
  return (
    <div>
        <h1 className='text-3xl sm:text-4xl font-semibold mb-2 text-center '>How it works</h1>
        <div>
            {stepsData.map((item,index)=>(
                <div key={index} className='text-1xl sm:text-2xl font-gray mb-2 flex  item-center gap-4 
                bg-white/40 shadow-md cursor-pointer hover:scale-[1.04] 
                px-5 py-2 rounded-full border border-neutral-500  '>
                    <img src={item.icon} alt="" />
                    <div>
                        <h3 className='text-xl font-medium'>{item.title}</h3>
                        <p className='text-gray-700'>{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Steps