'use client'

import Image from "next/image"
import { Eye,Heart,Trash } from 'lucide-react';
import Link from "next/link";
import {  useGlobalContext } from "../GlobalContext";
import { ProductType } from '../data'


type sideCart= ProductType & {
  closeSideCart:Function
}
export default function Product(prop:ProductType) {
 const {id,image,title,price,reviews,rating,wishlist,cart}=prop;
 const {addToWishlist,addToCart}=useGlobalContext() as {addToWishlist:Function,addToCart:Function};
  return (
    <article className="p-2 md:hover:border-black border group md:border-transparent border-black flex flex-col gap-4 overflow-hidden transition-all duration-500 relative">
     <div className="absolute md:opacity-0 md:group-hover:opacity-100 transition-all duration-700 md:w-full md:h-full md:bg-black/30 md:top-0 md:left-0 flex md:flex-row flex-col lg:gap-6 md:gap-4 gap-2 z-[1] items-center justify-center">
      <button onClick={()=>{addToWishlist(id)}} className={` rounded-full p-1.5 border-black/70 bg-white border-[1px] md:scale-125 lg:scale-150 md:hover:scale-110 lg:hover:scale-125 hover:bg-opacity-85 transition-all duration-100`}><Heart color="#000" strokeWidth={1} size={16}  fill={wishlist?'#000':'#fff'} /></button>
      <Link href={`/shop/${id}`} className={` bg-white rounded-full p-1.5 border-black/70 border-[1px] md:scale-125 lg:scale-150 md:hover:scale-110 lg:hover:scale-125 hover:bg-opacity-85 transition-all duration-100`}><Eye color="#000" strokeWidth={1} size={16} /></Link>
     </div>
     <div className="w-full h-[70%]">
      <Image src={image[0]} alt={title} width={300} height={300} className={` w-full h-full group-hover:scale-105 transition-all duration-500`}/>
     </div>
     <div className="flex flex-col gap-1 text-start">
      <h5 className="text-sm line-clamp-2">{title}</h5>
      <p className="font-semibold text-lg">$ {price}</p>
     <span className="opacity-50 text-sm">{rating} ({reviews})</span>
     <button onClick={()=>{addToCart(id)}} className="btn p-1 text-xs sm:text-sm md:group-hover:hover:bg-white/50 md:group-hover:bg-white md:group-hover:text-black md:group-hover:border-black  relative z-[5]">{cart?"remove from cart":"add to cart"}</button>
     </div>
    </article>
  )
}
export function SideCartProduct (prop:sideCart ){
  const {id,title,quantity,price,image,closeSideCart}=prop;
  const {addToCart}=useGlobalContext() as {addToCart:Function};

  return (
    <article className="w-full grid grid-cols-[25%_65%_5%] items-center" >
      <div className="rounded-md sm:h-[70px] xs:h-[100px] h-[70px] overflow-hidden bg-[#fbebb579]">
        <Image src={image[0]} alt={title} height={80} width={80} className=" bg-center bg-no-repeat bg-cover w-full h-full"/>
      </div>
      <div className="flex flex-col gap-2 px-4 justify-center">
        <Link href={`/shop/${id}`} onClick={()=>closeSideCart()} className="text-base line-clamp-1 hover:opacity-50" >{title}</Link>
        <p className="flex gap-2 text-sm"><span>{quantity}</span>x<span className="capitalize  text-[#B88E2F]">$ {price*quantity}</span></p>
      </div>
      <button onClick={()=>addToCart(id)} className="hover:scale-110">
        <Trash fill="#b88f2faa" color="#b88f2f" size={20} />
      </button>
    </article>
  )
}

export function CartProduct(prop:ProductType){
  const {changeQuant,addToCart}=useGlobalContext() as {changeQuant:Function,addToCart:Function,}
  const {image,title,id,price,quantity}=prop
  return (
    <div className=' w-full h-fit items-center grid grid-cols-[35%_17%_17%_17%_6%] justify-around sm:grid-cols-[40%_20%_16%_20%_4%] capitalize font-[500]'>
     <div className="grid lg:grid-cols-[100px_1fr] items-center  gap-3">
       <div className='md:w-[100px] w-[70px] md:h-[100px] h-[70px] rounded-md overflow-hidden bg-[#fbebb579]'>
         <Image src={image[0]} alt={title} height={100} width={100} className=" bg-center bg-no-repeat bg-cover w-full h-full"/>
       </div>
       <Link href={`/shop/${id}`} className='text-black/50 hover:text-black/70 line-clamp-1 text-sm'>{title}</Link>
     </div>
     <p className='text-black/50 '>$ {price}</p>
     <div className='flex flex-col sm:gap-0.5 border border-black/40 sm:px-1 w-fit rounded-md items-center mx-auto'>
              <button className='hover:bg-black/20 sm:p-2.5 p-1.5 py-0.5  rounded-full' onClick={()=>changeQuant(id,'inc')}>+</button>
              <span>{quantity}</span>
              <button className='hover:bg-black/20 sm:p-2 p-1.5 py-0  rounded-full' onClick={()=>changeQuant(id,'dec')}>-</button>
      </div>
     <p>$ {price*quantity}</p>
     <button onClick={()=>addToCart(id)} className="hover:scale-110">
        <Trash fill="#b88f2faa" color="#b88f2f" size={20} />
      </button>
    </div>
  )
}