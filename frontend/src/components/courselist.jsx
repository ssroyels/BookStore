import React, { useEffect, useState } from 'react'
import list from "../../public/list.json"
import Cards from './cards';
import { Link } from 'react-router-dom';
import axios from "axios";


const Courselist = () => {
  const [book,setBook] = useState([]);
  useEffect(() => {
    const getBook = async () => {
      try{
       const responce =  await axios.get("http://localhost:4000/book");
       console.log(responce.data);
       setBook(responce.data);
      } catch(err){
        console.log("Error : ",err);
      }
    }
    getBook();
  },[])
  return (
 
      <div className='mt-[20vh]'>
      <div className='text-center md:px-[18vh]'>
        <h1 className='mt-[10px] text-2xl md:text-4xl font-sans font-bold'>We're delighted to have you <span className='text-pink-500'>Here!:)</span> </h1>
        <p className='mt-[7vh] md:text-xl text-sm mr-[15px] ml-[15px] md:mr-0 md:ml-0  font-semibold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis natus, labore ab maiores rerum at inventore magnam sit, similique quam veniam, voluptatibus nam culpa minus fuga eligendi earum reiciendis officia! Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque nisi, mollitia quisquam, explicabo, libero laboriosam dolor placeat maxime vero suscipit nihil sequi ab ipsa neque earum officia. Ullam, vero ipsum!</p>
      <Link to={"/"}>
      <button className='btn bg-pink-500 text-white mt-[15px]'>Back</button>
      </Link>
     
      </div>
      <div className='mt-12 md:mx-20 grid grid-cols-1 md:grid-cols-4'>
     {
      book.map((item) => {
        return(
          <Cards item={item} key={item.id}/>
        )
      })
     }

      </div>
     
    </div>
   
  )
}

export default Courselist
