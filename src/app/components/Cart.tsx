'use client'
import { Trash, X } from 'lucide-react';
import Link from 'next/link';
import {  useGlobalContext } from '../GlobalContext';
import { ProductType } from '../data'
import { CartProduct, SideCartProduct } from './Product';
import { cartOpenClose } from './Header';

export default function CartSection() {
 const {cartProducts}=useGlobalContext() as {cartProducts:ProductType[]};
  return (
   <div className='flex flex-col gap-5 md:px-3 xs:px-2 px-1 mb-10'>
   <div className=" bg-[#FFF9E5] grid grid-cols-[30%_17%_17%_17%_6%] justify-around sm:grid-cols-[40%_20%_16%_20%_4%]  font-[500] lg:text-lg sm:text-sm text-xs md:text-base py-3 items-center capitalize truncate px-2">
     <p className='text-center'>product</p>
     <p>price</p>
     <p className='text-center'>quantity</p>
     <p>subtotal</p>
     <Trash fill="#b88f2faa" color="#b88f2f" size={20} />
   </div>
   <article className='flex gap-y-4 flex-col min-h-[50vh] max-h-[70vh] overflow-y-scroll overflow-x-hidden scrollbar py-5'>
   {cartProducts.length>0?
     cartProducts.map(product=>{
      return <CartProduct key={product.id} {...product} />
     }):<h1 className='text-lg text-black/40 my-4 mx-auto capitalize'>No products to display</h1>}
   </article>
 </div>
  )
}

export function SideCart({closeSideCart,sideCartOpen}:{closeSideCart:cartOpenClose,sideCartOpen:boolean}) {
 const {cartProducts,totalItems,cartTotal,}=useGlobalContext() as {cartProducts:ProductType[],totalItems:number,cartTotal:number,};
 
  return (
   <aside className={`${sideCartOpen?'scale-100  ':'scale-0 '} sm:origin-top origin-bottom-right transition-all duration-500 fixed flex flex-col sm:top-0 right-0 bottom-0  sm:w-[350px] w-full sm:h-[80vh] z-50 h-[90vh] bg-white`}>
    <div className="flex items-center">
     <h2 className="text-xl flex-1 font-bold m-5">Shopping Cart</h2>
     <button onClick={()=>closeSideCart()}>
      <X className='mr-5' />
     </button>
    </div>
    <span className='bg-black/20 h-[1px] mx-5'></span>
    <section className="flex-1 flex flex-col p-5 gap-2 max-h-[80%] overflow-x-hidden overflow-y-scroll scrollbar">
     {cartProducts.length>0?
     cartProducts.map(product=>{
      return <SideCartProduct key={product.id} {...product} closeSideCart={closeSideCart} />
     }):<p className='text-sm text-black/40 my-4 mx-auto'>No products to display</p>}
    </section>
    <div className='flex flex-col gap-2 text-sm capitalize pt-3 border-t'>
     <h1 className='flex justify-between ps-5 pe-10'>subtotal ( {totalItems} ) <span className='text-[#B88E2F] font-semibold'>$ {cartTotal}</span></h1>
     <div className="flex gap-4 items-center p-5 border-t border-t-black/4">
      <Link href={'/cart'} onClick={()=>closeSideCart()} className='btn rounded-2xl '>
      view cart
      </Link>
      <Link href={'/checkout'} onClick={()=>closeSideCart()} className='btn rounded-2xl '>
      checkout
      </Link>
     </div>
     
    </div>
   </aside>
  )
}
