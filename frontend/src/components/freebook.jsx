import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import list from "../../public/list.json"
import Cards from "./cards.jsx";
import axios from "axios";

const Freebook = () => {
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
 
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
   <>
      <div className="max-w-screen-2xl mx-auto container md:px-20 px-4 py-[10vh]">
        <div>
        <h1 className="text-2xl font-bold">Free Offered Courses</h1>
        <p className="text-sm font-sarif">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore facere
          amet iusto neque ipsam architecto, repudiandae sint recusandae sunt
          voluptatibus fugit quasi. Dolorum perspiciatis voluptatibus deleniti
          placeat itaque nisi ipsum.
        </p>
        </div>
       
      
      <div>
      
      
      <Slider {...settings}>
    {book.map((items) => {
      return( <Cards item={items}  key={items.id}/>)
    })}
      </Slider>
    </div>
      </div>
</>
      
   
  );
};

export default Freebook;
