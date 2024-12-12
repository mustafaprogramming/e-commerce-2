'use client'
import { useState } from 'react'
import { Banner } from '../../components/Banner'
import { useGlobalContext } from '@/app/GlobalContext'
import { X } from 'lucide-react'
import FRS from '@/app/components/ReturnBanner'

type Product = {
 id: string
 image: string[]
 SKU: string
 title: string
 price: number
 wishlist: boolean
 cart: boolean
 desc: string
 quantity: number
 stock: number
 size: string
 sizeOptions:string[]
 color: string
 colorOptions:string[]
 rating: number
 reviews: number
 category: string
 tags: string[]
}

export default function Checkout() {
 const [transferType,setTransferType]=useState('direct-bank')
 const {totalItems,cartTotal,cartProducts}=useGlobalContext() as {cartProducts:Product[],totalItems:number,cartTotal:number,};



  return (
    <main className={` flex flex-1 flex-col `}>
      <Banner text='Checkout' />
      <section className='lg:px-36 lg:py-16 md:px-20 sm:p-10 lg:gap-32 gap-5 px-3 sm:my-0 my-14 grid grid-cols-1 lg:grid-cols-2 '>
        <form className=''>
          <fieldset className='flex flex-col gap-10 py-10'>
            <legend className='sm:text-4xl text-3xl  font-[600]'>Billing details</legend>
            <div className='grid grid-cols-2 sm:gap-6 gap-3'>
              <div className='input-field'>
                <label htmlFor='first-name' className='label'>First Name</label>
                <input type='text' id='first-name' name='first-name' className='input' required />
              </div>
              <div className='input-field'>
                <label htmlFor='last-name' className='label'>last Name</label>
                <input type='text' id='last-name' name='last-name' className='input' required />
              </div>
            </div>
            <div className='input-field'>
                <label htmlFor='company-name' className='label'>company Name ( optional )</label>
                <input type='text' id='company-name' name='company-name' className='input' />
            </div>
            <div className='input-field'>
                <label htmlFor='country-region' className='label'>Country / Region</label>
                <input type='text' id='country-region' name='country-region' className='input' required />
            </div>
            <div className='input-field'>
                <label htmlFor='street-address' className='label'>Street address</label>
                <input type='text' id='street-address' name='street-address' className='input' required />
            </div>
            <div className='input-field'>
                <label htmlFor='town-city' className='label'>town / city</label>
                <input type='text' id='town-city' name='town-city' className='input' required />
            </div>
            <div className='input-field'>
                <label htmlFor='province' className='label'>Province</label>
                <input type='text' id='province' name='province' className='input' required />
            </div>
            <div className='input-field'>
                <label htmlFor='zip-code' className='label'>zip code</label>
                <input type='text' id='zip-code' name='zip-code' className='input' required />
            </div>
            <div className='input-field'>
                <label htmlFor='phone' className='label'>phone</label>
                <input type='tel' id='phone' name='phone' className='input' required />
            </div>
            <div className='input-field'>
                <label htmlFor='email' className='label'>email address</label>
                <input type='email' id='email' name='email' className='input' required />
            </div>
            <div className='input-field'>
                <textarea id='email' name='email' className='input' placeholder='Additional information' />
            </div>
          </fieldset>
        </form>
        <article className='flex flex-col gap-3 py-5'>
         <div className="grid grid-cols-2 text-xl md:text-2xl font-[500] capitalize">
          <p className=' text-start'>Product</p>
          <p className=' text-end'>subtotal</p>
         </div>
         <div className=" text-sm font-[500] capitalize">
          {cartProducts.map((product)=>{
            return  <div className='grid grid-cols-[60%_10%_30%]' key={product.id}>
                      <p className='text-black/50 line-clamp-1'>{product.title}</p>
                      <span className='text-black/80 text-start flex gap-1.5 items-center '><X size={12} color='#000' />{product.quantity} </span>
                      <p className='text-black/50 text-end'>$ {product.quantity*product.price}</p>
                    </div>
          })}
         </div>
         <div className="grid grid-cols-2 text-sm font-[500] capitalize">
          <p className='text-black/80 text-start'>subtotal ( {totalItems} )</p>
          <p className='text-black/50 text-end'>$ {cartTotal}</p>
         </div>
         <div className="grid grid-cols-2 text-sm font-[500] capitalize">
          <p className='text-black/80 text-start'>total ( {totalItems} )</p>
          <p className='text-[#B88E2F] sm:text-xl text-lg text-end font-semibold'>$ {cartTotal}</p>
         </div>
         <aside className='border-t py-6 my-4 flex flex-col gap-2'>
           <div className='flex gap-2'>
            <input type="radio" name='transfer-type' id='direct-bank' required checked={transferType==='direct-bank'} value={'direct-bank'} className='accent-black' onChange={(e)=>setTransferType(e.target.value)} />
            <label htmlFor="direct-bank" className={`label ${transferType==='direct-bank'?'text-black':'text-black/50'} `}>Direct Bank Transfer</label>
           </div>
           <p className="text-sm text-black/50 word-spacing-wide">
            Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
            </p>
           <div className='flex gap-2'>
            <input type="radio" name='transfer-type' id='direct-cash' checked={transferType==='direct-cash'} value={'direct-cash'} className='accent-black' onChange={(e)=>setTransferType(e.target.value)} />
            <label htmlFor="direct-cash" className={`label ${transferType==='direct-cash'?'text-black':'text-black/50'} `}>cash on delivery</label>
           </div>
           <p className="text-sm text-black/50 word-spacing-wide">
            Make your payment when you receive your order. Please check your product before payment.
            </p>
           <p className="text-sm text-black/80 word-spacing-wide mt-2">
           Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <strong>privacy policy.</strong>
           </p>
           <div className='p-2 w-full flex justify-center'>
            <button className='btn rounded-lg px-10 py-2'>place order</button>
           </div>
         </aside>
        </article>
      </section> 
      <FRS />
    </main>
  )
}
