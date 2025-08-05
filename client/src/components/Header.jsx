/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import {assets} from '../assets/assets'
import { delay, motion } from "motion/react"
import { AppContext } from '../context/AppContext'
import {useNavigate} from 'react-router-dom'
const Header = () => {
  const {user,setShowLogin} = useContext(AppContext);
  const navigate=useNavigate();
  const onClickHandler=()=>{
    if(user){
        navigate('/result')
    }else{
        setShowLogin(true)
    }

  }
  return (
    <motion.div className='flex flex-col justify-center items-center text-center my-20'
    initial={{opacity:0.2 , y:100}} transition={{duration:1}}
        whileInView={{opacity:1 , y:0}} viewport={{once:true}}>

        <motion.div className='text-stone-500 inline-flex text-center 
        gap-2 bg-white px-4 py-1 rounded-full border border-neutral-500'
        initial={{opacity:0 , y:-50}} transition={{delay:0.2 , duration:1}}
        animate={{opacity:1,y:0}}
        >
            <p>High quality text-to-image generator</p>
            <img src={assets.star_icon} />
        </motion.div>
        <motion.h1 className='text-4xl max-w-[300px] sm:text-4xl
        sm:max-w-[590px] mx-auto mt-10 text-center' 
        initial={{opacity:0 }} transition={{delay:0.5 , duration:2}}
        animate={{opacity:1}}>
            Write your text and look at the amazing generated  
             <span className='text-orange-600'> image!</span></motion.h1>
        
        <motion.p className='text-center max-w-xl mx-auto mt-5'
        initial={{opacity:0, y:20}} transition={{delay:0.6 , duration:0.8}}
        animate={{opacity:1,y:0}}>
            Turn your imagination into visual art in seconds</motion.p>
        <motion.button onClick={onClickHandler} className='sm:text-lg text-white bg-black w-auto mt-8 
        px-12 py-2 flex item-center gap-2 rounded-full  hover:scale-[1.1]'
        whileHover={{scale:1.05}} whileTap={{scale:0.95}} initial={{opacity:0}}
        animate={{opacity:1}} 
        transition={{default:{duration:0.5},opacity:{delay:0.8,duration:1}}}>
            Generate
            <img className='h-6' src={assets.star_group} alt=""/>
        </motion.button>
    </motion.div>
  )
}

export default Header