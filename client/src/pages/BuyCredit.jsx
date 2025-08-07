/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { assets, plans } from '../assets/assets'
import {AppContext} from '../context/AppContext'
import { delay, motion } from "motion/react"

const BuyCredit = () => {

  const {user,checkout} =useContext(AppContext);

  return (
    <motion.div className='min-h-[80vh] text-center pt-14 mb-10'
    initial={{opacity:0.2 , y:100}} transition={{duration:1}}
        whileInView={{opacity:1 , y:0}} viewport={{once:true}}>
      <button className='border border-gray-400 px-10 py-2 rounded-full text-xl mb-6'>Plans</button>
      <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10 text-orange-600'>
        Choose the plan</h1>
      <div className='flex flex-wrap gap-6 text-left justify-center '>
        {plans.map((item,index)=>(
          <div key={index} className=' 
           gap-6 bg-white drop-shadow-sm
           border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 
          transition-all duration-500 '>
            <img src={assets.logo_icon} alt='' width={40}/>
            <h1 className='mt-3 mb-1 font-semibold'>{item.id}</h1>
            <p className='text-sm'>{item.desc}</p>
            <p className='mt-6'>
              <span className='text-3xl 
              font-medium'>${item.price}</span> / {item.credits} credits</p>
            <button onClick={()=>checkout(item.id)} className='mt-6 bg-zinc-600 text-white rounded-full p-4 w-full'>
              {user ? 'Purchase' : 'Get Started'}</button>
          </div>
        ))}
      </div>
    </motion.div>

  )
}

export default BuyCredit
