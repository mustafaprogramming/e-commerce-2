'use client'
import { Banner } from '@/app/components/Banner'
import { useGlobalContext } from '@/app/GlobalContext'
import { SearchIcon } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { ProductType } from '@/app/data'
import Product from '@/app/components/Product'
import FRS from '@/app/components/ReturnBanner'
import Recommended from '@/app/components/Recommended'

export default function Search() {
  const { products } = useGlobalContext() as { products: ProductType[] }
  const showNumber = 8
  const [keyword, setKeyword] = useState('')
  const [loading, setLoading] = useState(false)
  const [SearchResults, setSearchResults] = useState<ProductType[]>([])

  
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword)
  const search = useCallback(() => {
    setLoading(true)

    const keywordLower = debouncedKeyword.toLowerCase()
    const searchArray = products.filter((product) =>
      product.title.toLowerCase().includes(keywordLower)
    )

    setSearchResults(searchArray)
    setLoading(false)
  }, [products, debouncedKeyword, setSearchResults])
  useEffect(() => {
    search()
  }, [search])
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedKeyword(keyword), 300) // Debounce for 300ms
    return () => clearTimeout(handler) // Clear timeout on keyword change
  }, [keyword])
  return (
    <main className={` flex flex-1 flex-col `}>
      <Banner text='Search' />
      <section className='flex flex-col w-full items-center sm:py-10 py-5 border-b'>
        <div className='grid grid-cols-[85%_15%] px-2 gap-1 max-w-[600px] w-full'>
          <div className='input-field'>
            <input
              type='text'
              onChange={(e) => setKeyword(e.target.value)}
              id='search-word'
              name='search-word'
              className='input '
              placeholder='Enter search keywords'
            />
          </div>
          <button
            className='flex items-center justify-center btn p-0 rounded-lg '
            onClick={search}
          >
            <SearchIcon />
          </button>
        </div>
        <div className='text-sm sm:px-10 w-full bg-[#FAF4F4] py-3 px-2 text-black/50 mt-5'>
          <span className='border-l border-black/40 px-3'>
            showing {Math.min(SearchResults.length, showNumber)} of{' '}
            {SearchResults.length} products
          </span>
        </div>
        <section className='my-5 flex px-2 md:px-5 min-h-[60vh]'>
          {loading && (
            <div className="flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-black"></div>
          </div>
          )}
          {SearchResults.length > 0 ? (
            <aside className='mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 my-10'>
              {SearchResults.slice(0, showNumber).map((product) => {
                return <Product key={product.id} {...product} />
              })}
            </aside>
          ) : (
            <h4 className='lg:text-3xl md:text2 sm:text-xl text-lg text-black/50 capitalize mx-auto'>
              no matches for the keyword
            </h4>
          )}
        </section>
      </section>
      <Recommended />
      <FRS />
    </main>
  )
}
