import React from 'react'


const Banner = () => {
  return (
    <div className='md:flex md:justify-around '>
      <div className='mt-[8vh] pt-[10vh] md:pt-0  md:mt-[15vh]'>
        <h1 className='md:text-4xl text-2xl ml-[15px] mr-[15px] font-bold'>Hello,Welcomes here to  learn <br /> something <span className='text-pink-500'>new everyday!!!</span></h1>
        <p className='mt-[25px] md:text-xl text-sm ml-[15px] mr-[15px] font-semibold'>Lorem ipsum dolor sit amet consectetur 
          adipisicing elit. Aliquid ipsum libero  <br />
          vero fugit eum dignissimos, cupiditate eos <br /> repellat 
          natus, accusamus rem consectetur <br /> labore qui iure officiis 
          ducimus minima possimus. Tempore?</p>
          <label className="mt-[25px] ml-[15px] input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input type="text" className="grow text-black" placeholder="Email" />
            </label>

            <button className='mt-[25px]  btn bg-pink-500 ml-[15px] text-white'>Get Started</button>
      </div>
      <div className='md:mt-[15vh] mt-[5vh] md:ml-[0px] md:mr-[0px] ml-10'>
        <img src="https://cdn.creazilla.com/cliparts/39999/bookstore-clipart-md.png" className='md:h-[35vh] h-[20vh]' alt="" />
      </div>
    </div>
  )
}

export default Banner
