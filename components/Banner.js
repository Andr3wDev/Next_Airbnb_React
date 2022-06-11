import React from 'react';
import Image from 'next/image';
import bannerImage from '../public/banner.jpg';

function Banner() {
  return (
    <div className='relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px]'>
      <Image alt="banner" objectFit='cover' layout='fill'
            src={bannerImage} />
      <div className='absolute top-1/2 text-center w-full'>
        <p className='text-sm sm:text-lg'>Not sure where to go? Perfect.</p>
        <button className='text-purple-500 bg-white 
            px-10 py-4 shadow-md rounded-full font-bold 
            my-3 hover:shadow-xl active:scale-90 transition duration-200'>
            Im flexible
        </button>
      </div>
    </div>
  )
}

export default Banner