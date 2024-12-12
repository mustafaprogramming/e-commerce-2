'use client'
import { useGlobalContext } from '@/app/GlobalContext'
import { Banner } from '../../components/Banner'
import Product from '@/app/components/Product'
import { ProductType } from '@/app/data'

import Recommended from '@/app/components/Recommended'

export default function Wishlist() {
  const { products } = useGlobalContext() as { products: ProductType[] }
  const wishProducts = products.filter((item) => item.wishlist)
  const notWishProducts = products.filter((item) => !item.wishlist).slice(0, 8)

  return (
    <main className={` flex flex-1 flex-col `}>
      <Banner text='Wishlist' />
      <section
        className={`my-10 md:mt-20  ${
          wishProducts.length > 0 ? 'grid' : 'flex items-center justify-center'
        } grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:px-10 mb-10 px-2 min-h-[40vh]  `}
      >
        {wishProducts.length > 0 ? (
          wishProducts.map((product) => {
            return <Product key={product.id} {...product} />
          })
        ) : (
          <h1 className='capitalize md:text-4xl sm:text-3xl xs:text-2xl text-xl font-[500] text-center text-black/60'>
            your wishlist products will display here
          </h1>
        )}
      </section>
      <Recommended num={8} array={notWishProducts} />
    </main>
  )
}
