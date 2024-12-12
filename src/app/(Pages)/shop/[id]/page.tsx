'use client'
import {  cartWishlist, ChangeQuant, ChangeVal, useGlobalContext } from '@/app/GlobalContext';
import { ProductType } from '@/app/data'
import Link from 'next/link';
import { ChevronRight , Star , StarHalf , Heart } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import FRS from '@/app/components/ReturnBanner';
import Recommended from '@/app/components/Recommended';


export default function User() {
  const {id}=useParams() as {id:string};
  const {products,changeColor,changeSize,changeQuant,addToCart,addToWishlist} = useGlobalContext() as {products:ProductType[],changeColor:ChangeVal,changeSize:ChangeVal,changeQuant:ChangeQuant,addToCart:cartWishlist,addToWishlist:cartWishlist,};
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState(false)
  const [imgIdx,setImgIdx]=useState(0)
  useEffect(()=>{
    setLoading(true)
    const item=products.find(el=>el.id===id);
    if(item){
      setProduct(item);
      setLoading(false)
    }else if(!item){
      setLoading(false)
      setError(true)
    }
  },[id,products])

  if(loading){
    return <div className="flex items-center justify-center h-screen">
    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-black"></div>
  </div>
  }
  if(!product||error){
      return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-white via-black/50 to-black">
          <div className="text-center text-white px-6 py-12 md:px-12 md:py-16">
            <h1 className="text-5xl font-extrabold mb-4">Product Not Found</h1>
            <p className="text-lg mb-6">
              Sorry, we couldn&apos;t find the product you were looking for.
            </p>
            <Link href="/shop" className="inline-block bg-black/80 text-white px-6 py-3 rounded-lg text-lg hover:bg-black transition duration-300 ease-in-out">
                Go Back to Shop
            </Link>
          </div>
        </div>
      );
    }
  
  const {image,SKU,title,price,rating,reviews,wishlist,cart,desc,quantity,stock,size,sizeOptions,colorOptions,color,category,tags}=product;
  const starArr=Array.from({length: (Math.floor(rating))});
  const point=Number(rating.toString().split('.')[1]);
  const relatedProducts = products
  .filter((item) => 
    item.tags.some((tag) => tags.includes(tag)) // Check if any tag matches
  )
  .filter((item) => item.id !== id) // Exclude the current product
  .slice(0, 4); // Limit to 4 items
  return (
    <main className={` flex flex-1 flex-col mt-14`}>
      <div className='w-full md:px-20 px-5 py-5 sm:py-10 flex gap-2 text-sm font-[500]'>
        <Link href={'/'} className='opacity-40'>Home</Link>
        <ChevronRight color='#000' size={20} />
        <Link href={'/shop'} className='opacity-40'>Shop</Link>
        <ChevronRight color='#000' size={20} />
        <span className='border-l border-black pl-5 ml-1 line-clamp-1'>{title}</span>
      </div>
      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[60%_40%] xl:grid-cols-2 p-10 gap-5 '>
        <div className='grid grid-cols-1 h-fit lg:grid-cols-[15%_85%] lg:gap-10 gap-5 '>
          <div className='flex lg:flex-col gap-4 '>
            {image.map((singelImg,index)=>{
              return (
                <button key={index} className={`overflow-hidden rounded-md border ${index===imgIdx?'border-black':'border-transparent'} md:w-[100px] md:h-[100px] h-[50px] w-[50px] `} onClick={()=>{setImgIdx(index)}}>
                  <Image src={singelImg} alt={title} width={100} height={100} className={`w-full h-full bg-center bg-no-repeat bg-cover`} />
                </button>
              )
            })}
          </div>
          <div className='lg:max-w-[85%] h-full max-h-[500px] max-w-[500px] border rounded-md '>
            <Image src={image[imgIdx]} alt={title} width={500} height={500} className={`w-full h-full bg-center bg-no-repeat bg-cover`} />
          </div>
        </div>
        <aside className='flex flex-col sm:gap-3 lg:mt-0 md:mt-28'>
          <h1 className='lg:text-4xl sm:text-3xl text-xl'>
            {title}
          </h1>
          <h2 className='lg:text-2xl sm:text-xl text-lg opacity-50'>$ {price}</h2>
          <div className='flex sm:flex-row flex-col sm:items-center'>
            <div className='flex gap-1 items-center'>
              {starArr.map((el,index)=>{
                return <Star key={index} color='#FFDA5B' size={16} fill='#FFDA5B' />
              })}
              {point?<StarHalf color='#FFDA5B' size={16} fill='#FFDA5B' />:''}
              ({rating})
            </div>
            <span className='border-l border-black w-1 sm:h-8 border-opacity-40 mx-4'></span>
            <p className='inline opacity-40'>{reviews} Customer reviews</p>
          </div>
          <p className='text-sm max-w-[400px]'>{desc}</p>
          <div className='flex flex-col gap-3'>
              <span className='opacity-40 capitalize  text-sm'>size</span>
              <div className='flex gap-2'>
                {sizeOptions.map((SIZE,index)=>{
                  return <button key={index} className={`${SIZE===size?'bg-[#FBEBB5] ':'bg-[#FAF4F4]'} px-3 py-1.5  rounded-[5px] text-sm `} onClick={()=>{changeSize(id,SIZE)}}>{SIZE}</button>
                })}
            </div>
          </div>
          <div className='flex flex-col gap-3'>
            <span className='opacity-40 capitalize  text-sm'>color</span>
            <div className='flex gap-2'>
              {colorOptions.map((col,index)=>{
                return <button key={index} className={`${col===color?' outline-black outline-1 outline':''} border h-6 w-6 rounded-full text-sm `} onClick={()=>{changeColor(id,col)}} style={{backgroundColor:col}}></button>
              })}
            </div>
          </div>
          <div className='flex xs:gap-3 gap-1.5 my-3'>
            <div className='flex sm:gap-3 gap-1 border border-black/40 sm:px-3 px-1 w-fit rounded-md items-center'>
              <button className='hover:bg-black/20 xs:p-2.5 p-1.5 xs:py-0.5 py-0  rounded-full' onClick={()=>changeQuant(id,'dec')}>-</button>
              <span>{quantity}</span>
              <button className='hover:bg-black/20 xs:p-2 p-1 xs:py-0.5 py-0  rounded-full' onClick={()=>changeQuant(id,'inc')}>+</button>
            </div>
            <button className=' lg:px-8 sm:px-6 sm:py-3 sm:text-sm text-xs px-2 py-1 border-black border bg-transparent hover:bg-black hover:text-white capitalize rounded-xl transition-all duration-500' onClick={()=>addToCart(id)}>
            {cart?'remove from cart':'add to Cart'} 
            </button>
            <button className={`lg:p-4 sm:p-3 p-1 w-fit text-sm border-black border bg-transparent ${wishlist?'rounded-[50%]':'hover:rounded-[50%] rounded-[10px]'} transition-all duration-500 `} onClick={()=>addToWishlist(id)}>
              {wishlist?<Heart strokeWidth={2} fill='#000' className='scale-75 md:scale-100' />:<Heart strokeWidth={2}  fill='#fff' className='scale-75 md:scale-100' />}
            </button>
          </div>
          <hr className='lg:mt-10 my-5'/>
            <div className='grid grid-cols-[29%_1%_70%] w-full gap-3 text-black/40 capitalize  text-sm'>
              <span>stock</span><span>:</span>{stock>0?<span >{stock}</span>:<span className='text-red-500 capitalize  text-sm'>out of stock</span>}
              <span>SKU</span><span>:</span><span>{SKU?SKU:'?'}</span>
              <span>category</span><span>:</span><span>{category?category:'?'}</span>
              <span>tags</span><span>:</span><span>{tags.length>0?tags.map(tag=>tag+', '):'?'}</span>

            </div>
        </aside>
      </section>
      <Recommended title='related products' text='you may also like these products' array={relatedProducts} />
      <FRS />
    </main>
  )
}
