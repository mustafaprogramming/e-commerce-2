'use client'

import { SecondaryButton } from '@/app/components/Button'
import Link from 'next/link'
import Product from './Product'
import {  useGlobalContext } from '../GlobalContext'
import { ProductType } from '../data'

export default function Recommended({
  array,
  title,
  text,
  num = 4,
}: {
  array?: ProductType[]
  title?: string
  text?: string
  num?: number
}) {
  const { products } = useGlobalContext() as { products: ProductType[] }
  let showProducts: ProductType[] = array ? array : products
  if (showProducts.length <= 0) {
    return <></>
  }
  return (
    <section className=' text-center md:my-10 my-5 md:mx-20 mx-2'>
      <h2
        className={`font-[500] capitalize lg:text-4xl md:text-3xl sm:text-2xl text-xl mb-3`}
      >
        {title ? title : 'Recommended products'}
      </h2>
      {text && <p className='opacity-50 sm:font-[500]'>{text}</p>}
      <aside className='mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 my-10'>
        {showProducts.slice(0, num).map((product) => {
          return <Product key={product.id} {...product} />
        })}
      </aside>
      <Link href={'/shop'} className='w-full '>
        <SecondaryButton text={'view more'} dark />
      </Link>
    </section>
  )
}
