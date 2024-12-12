'use client'
import {  useGlobalContext } from '@/app/GlobalContext'
import { ProductType } from '@/app/data'

import { Banner } from '../../components/Banner'
import Product from '@/app/components/Product'
import { useEffect, useState } from 'react'
import FRS from '@/app/components/ReturnBanner'
import Recommended from '@/app/components/Recommended'

export default function Shop() {
  const { products } = useGlobalContext() as { products: ProductType[] }
  const [showNumber, setShowNumber] = useState(8)
  const [sortType, setSortType] = useState('default')
  const [showProducts, setShowProducts] = useState<ProductType[]>([])
  const [noOfPages, setNoOfPages] = useState(0)
  const [pageIndex, setPageIndex] = useState(0)

  // Generate button array for pagination
  const btnArr = Array.from({ length: noOfPages }, (_, i) => i + 1)

  // Update displayed products when sorting, pagination, or showNumber changes
  useEffect(() => {
    // Ensure `showNumber` is within valid range
    const validShowNumber = Math.max(8, Math.min(showNumber, products.length))
    setShowNumber(validShowNumber)

    // Calculate start and end indices for pagination
    const startIdx = pageIndex * validShowNumber
    const endIdx = startIdx + validShowNumber

    // Create a sorted copy of `products` based on `sortType`
    const sortedProducts = [...products]
    if (sortType === 'price') {
      sortedProducts.sort((a, b) => a.price - b.price)
    } else if (sortType === 'reviews') {
      sortedProducts.sort((a, b) => b.reviews - a.reviews)
    } else if (sortType === 'rating') {
      sortedProducts.sort((a, b) => b.rating - a.rating)
    }

    // Update displayed products
    setShowProducts(sortedProducts.slice(startIdx, endIdx))
  }, [sortType, showNumber, pageIndex, products])

  // Reset to the first page whenever `showNumber` changes
  // Update the number of pages whenever products or showNumber changes
  useEffect(() => {
    if (showNumber > 1) {
      const pages = Math.ceil(products.length / showNumber)
      setNoOfPages(pages)
      setPageIndex(0)
    }
  }, [ showNumber])

  return (
    <main className={` flex flex-1 flex-col `}>
      <Banner text='shop' />
      <div
        id='filter'
        className=' bg-[#FAF4F4] my-6 py-2 w-full flex sm:flex-row flex-col justify-between gap-2 sm:items-center md:px-10 px-4'
      >
        <span className='border-l border-black opacity-70 pl-4 text-sm'>
          Showing {pageIndex * showNumber + 1}-
          {pageIndex * showNumber + showNumber < products.length
            ? Number(pageIndex * showNumber + showNumber)
            : products.length}{' '}
          of {products.length} results
        </span>
        <div className='flex gap-10'>
          <div className='font-[500] flex items-center gap-2'>
            Show{' '}
            <input
              type='number'
              min={8}
              max={16}
              value={showNumber}
              onChange={(e) => {
                setShowNumber(Number(e.target.value))
              }}
              className='bg-white p-2 w-[45px] h-[90%] outline-none select-none'
            />
          </div>
          <div className='font-[500] flex items-center gap-2'>
            Sort By
            <select
              className='outline-none h-[90%]'
              onChange={(e) => {
                setSortType(e.target.value)
              }}
            >
              <option value='default'>Default</option>
              <option value='price'>Price</option>
              <option value='rating'>Rating</option>
              <option value='reviews'>Reviews</option>
            </select>
          </div>
        </div>
      </div>
      <section
        className={` grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:px-10 mb-10 px-2 `}
      >
        {showProducts.map((product) => {
          return <Product key={product.id} {...product} />
        })}
      </section>
      <aside className=' w-full flex gap-2 justify-center items-center my-5'>
        {btnArr.map((i, index) => {
          return (
            <a
              href='#filter'
              key={index}
              onClick={() => {
                setPageIndex(index)
              }}
              className={` py-2 px-5 rounded-md ${
                index === pageIndex ? 'bg-[#FBEBB5]' : 'bg-[#FFF9E5]'
              } `}
            >
              {noOfPages === index + 1 ? 'next' : i}
            </a>
          )
        })}
      </aside>
      <Recommended />
      <FRS />
    </main>
  )
}
