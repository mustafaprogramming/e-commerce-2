'use client'
import Link from 'next/link'
import { Banner } from '../../components/Banner'
import {  useGlobalContext } from '@/app/GlobalContext'
import { ProductType } from '@/app/data'
import CartSection from '@/app/components/Cart';
import FRS from '@/app/components/ReturnBanner';
import Recommended from '@/app/components/Recommended';

export default function Cart() {
  const {totalItems,cartTotal,products}=useGlobalContext() as {totalItems:number,cartTotal:number,products:ProductType[]};
  const notCartProduct = products.filter((item) => !item.cart).slice(0,4)
  return (
    <main className={` flex flex-1 flex-col `}>
      <Banner text='Cart' />
      <section className='md:p-10 py-10 px-1 grid grid-cols-1 md:grid-cols-[70%_30%]'>
        <CartSection />
        <aside className=' bg-[#FFF9E5] h-fit font-[500] text-sm text-center capitalize py-10'>
          <h1 className='lg:text-3xl text-2xl font-bold '>cart totals</h1>
          <div className="flex flex-col xs:w-[70%] mx-auto mt-5 gap-y-4 ">
            <p className='flex justify-between px-12 mt-10 '>subtotal <span className='text-black/40'>rs. {cartTotal}</span></p>
            <p className='flex justify-between items-center px-12 mb-10'>Total ( {totalItems} ) <span className='text-[#B88E2F] text-lg'>rs. {cartTotal}</span></p>
          </div>
          <Link href={'/checkout'} className="btn rounded-xl text-lg px-6 sm:px-14 py-2">Checkout</Link>
        </aside>
      </section>
      <Recommended array={notCartProduct} />
      <FRS />
    </main>
  )
}
