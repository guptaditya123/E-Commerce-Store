import React, { useEffect, useState } from 'react'
import { cartStore } from '../store/cartStore';

const FeaturedProducts = ({featuredProducts}) => {
    const [currentIndex,setCurrentIndex]=useState(0);
    const [itemsPerPage,setItemsPerPage]=useState(4);

    const {addToCart} = cartStore();

    useEffect(()=>{
        const handleResize = ()=>{
            if(window.innerWidth<640) setItemsPerPage(1);
            else if(window.innerWidth < 1024) setItemsPerPage(2);
            else if(window.innerWidth < 1280) setItemsPerPage(3);
            else setItemsPerPage(4);
        }
        handleResize();
        window.addEventListener("resize",handleResize);
        return ()=> window.removeEventListener("resize",handleResize);
    },[]);

    const nextSlide = ()=>{
        setCurrentIndex((prevIndex)=>prevIndex + itemsPerPage);
    };
    const prevSlide = ()=>{
        setCurrentIndex((prevSlide)=> prevSlide - itemsPerPage);
    }
    const isStartDisabled = currentIndex === 0;
    const isEndDisabled = currentIndex >= featuredProducts.length - itemsPerPage;
  return (
    <div>

    </div>
  )
}

export default FeaturedProducts