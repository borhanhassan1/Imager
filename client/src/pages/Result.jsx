/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { delay, motion } from "motion/react"
import { AppContext } from '../context/AppContext';

const Result = () => {

  const [image,setImage] = useState(assets.sample_img_2);
  const [isImageLoaded,setIsImageLoaded] = useState(false);
  const [loading,setLoading] = useState(false);
  const [input,setInput] =useState('');
  const {generateImage} = useContext(AppContext);
  const onSubmitHandler = async (e)=>{
        e.preventDefault();
        setLoading(true);
        if(input){
          const image=await generateImage(input);
          if(image){
            setIsImageLoaded(true);
            setImage(image);
          }
        }
        setLoading(false);
    }
  return (
      <motion.form onSubmit={onSubmitHandler} className='flex flex-col min-h-[90vh] justify-center items-center'
      initial={{opacity:0.2 , y:100}} transition={{duration:1}}
        whileInView={{opacity:1 , y:0}} viewport={{once:true}}>
          <div>
          <div className='relative'>
              <img src={image} alt='' className='max-w-sm rounded' />
              <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 
              ${loading ? 'w-full transition-all duration-[10s]' : 'w-0'}`} />         
          </div>
            {loading && <p className='mt-2'>Loading.....</p>}
        </div>
        {!isImageLoaded && 
          <div className='flex w-full max-w-xl bg-neutral-500 
          text-white text-sm p-0.5 mt-10 rounded-full'>
            <input type='text'  
             onChange={e => setInput(e.target.value)} value={input}
            placeholder='Describe what you want!'
              className='text-lg flex-1 bg-transparent outline-none ml-4 max-sm:w-20' />
              <button type='submit' className='text-xl bg-zinc-900 px-10 
              sm:px-12 py-3 rounded-full '>Generate</button>
          </div>
        }
        {isImageLoaded &&
            <div className='justify-center flex-wrap gap-4 text-white text-sm 
            p-0.5 mt-10 rounded-full flex'>
              <p onClick={()=>{setIsImageLoaded(false)}} className='bg-transparent border border-zinc-900 
              text-black px-8 py-3 rounded-full cursor-pointer'>Generate Another</p>
              <a href={image} download className='bg-zinc-900 rounded-full px-8 py-3'>Download</a>
            </div>
        }
      </motion.form>
  )
}

export default Result