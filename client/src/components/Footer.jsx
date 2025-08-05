import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex items-center justify-between gap-4 py-3 mt-20'>
        <img src={assets.logo} alt='' width={150} />
        <p className='flex-1 gap-3 border-l border-gray-400 pl-4 
        text-sm text-gray-500 max-sm:hidden'>Copyright @borhan | All right reserved.</p>
        <div className='flex gap-3'>
            <a href='https://www.facebook.com/' target='_blank'>
               <img src={assets.facebook_icon} alt='' width={35}/>
            </a>
            <a href='https://x.com/' target='_blank'>
               <img src={assets.twitter_icon} alt='' width={35}/>
            </a>
            <a href='https://www.instagram.com/' target='_blank'>
               <img src={assets.instagram_icon} alt='' width={35}/>
            </a>
        </div>
    </div>
  )
}

export default Footer