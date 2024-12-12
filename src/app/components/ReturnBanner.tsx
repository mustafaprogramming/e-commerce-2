'use client'
import { useEffect } from "react";

export default function FRS() {
 useEffect(() => {
  const elements = document.querySelectorAll('.show-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('hide');
      }
    });
  });

  elements.forEach((element) =>observer.observe(element));

  return () => observer.disconnect();
}, []);
  return (
   <section className='show-on-scroll hide bg-[#FAF4F4] sm:px-32 py-20 gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center'>
   <div className='flex flex-col gap-2'>
     <h1 className='text-3xl font-[500]'>Free Delivery</h1>
     <p className='text-base opacity-50 max-w-[250px]'>
       For all oders over $50, consectetur adipim scing elit.
     </p>
   </div>
   <div className='flex flex-col gap-2'>
     <h1 className='text-3xl font-[500]'>90 Days Return</h1>
     <p className='text-base opacity-50 max-w-[250px]'>
       If goods have problems, consectetur adipim scing elit.
     </p>
   </div>
   <div className='flex flex-col gap-2'>
     <h1 className='text-3xl font-[500]'>Secure Payment</h1>
     <p className='text-base opacity-50 max-w-[250px]'>
       100% secure payment, consectetur adipim scing elit.
     </p>
   </div>
 </section>
  )
}
