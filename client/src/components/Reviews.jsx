import React from 'react'
import { testimonialsData } from '../assets/assets'
import { assets } from '../assets/assets'

const Reviews = () => {
  return (
    <div className='flex flex-col items-center justify-center my-20 py-12'>
        <h1 className='text-3xl sm:text-4xl font:semibold mb-2'>Customer Reviews</h1>
        <p className='text-gray-500 mb-12'>What our users are saying</p>
        <div className='flex flex-center gap-10'>
            {testimonialsData.map((item,index)=>(
                <div key={index} className='bg-white/50 p-12 rounded-lg shadow-md
                order w-100 m-auto cursor-pointer hover:scale-[1.04] transition-all'>
                    <div className='flex flex-col items-center '>
                        <img src={item.image} alt='' className='rounded-full w-14' />
                        <h2 className='text-xl font-semibold mt-3'>{item.name}</h2>
                        <p className='text-gray-500 mb-4'>{item.role}</p>
                        <div className='flex mb-4'>
                                {Array(item.stars).fill().map((_,index)=>(
                                    <img key={index} src={assets.rating_star} alt=''/>
                                ))}
                        </div>
                        <p className='text-center text-gray-600'>{item.text}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Reviews