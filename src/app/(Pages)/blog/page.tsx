'use client'
import FRS from '@/app/components/ReturnBanner'
import { Banner } from '../../components/Banner'
import {  useGlobalContext } from '@/app/GlobalContext'
import { blogType } from '@/app/data'
import BlogBG from '@/app/components/Blog'
import { useEffect, useState } from 'react'
import { SearchIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Blog() {
  const { blogs } = useGlobalContext() as { blogs: blogType[] }
  const [showBlogs, setShowBlogs] = useState<blogType[]>([])
  const [noOfPages, setNoOfPages] = useState(0)
  const [loading, setLoading] = useState(false)
  const [searchResults, setSearchResults] = useState<blogType[]>([])
  const [pageIndex, setPageIndex] = useState(0)
  const [keyword, setKeyword] = useState('')
  function search() {
    setLoading(true)
    const searchArray = blogs.filter((product) => {
      const titleSet = new Set(product.title.toLowerCase()) // Create a Set for the title
      return keyword
        .toLowerCase()
        .split('')
        .every((letter) => titleSet.has(letter)) // Check using the Set
    })

    setSearchResults(searchArray)
    setLoading(false)
  }
  useEffect(() => {
    search()
  }, [keyword])
  // Generate button array for pagination
  const btnArr = Array.from({ length: noOfPages }, (_, i) => i + 1)
  let showNumber = 3
  useEffect(() => {
    // calculate pages
    const pages = Math.ceil(blogs.length / showNumber)
    setNoOfPages(pages)
    // Calculate start and end indices for pagination
    const startIdx = pageIndex * showNumber
    const endIdx = startIdx + showNumber
    // Update displayed Blogs
    setShowBlogs(blogs.slice(startIdx, endIdx))
  }, [pageIndex, blogs])
  return (
    <main id='top' className={` flex flex-1 flex-col `}>
      <Banner text='Blog' />
      <div className='text-sm sm:px-10 bg-[#FAF4F4] py-3 px-2 text-black/50 my-5'>
        <span className='border-l border-black/40 px-3'>
          showing {Math.max(pageIndex * showNumber, 1)}-
          {Math.min(showNumber * (pageIndex + 1), blogs.length)} of{' '}
          {blogs.length} blogs
        </span>
      </div>
      <section className='grid xl:grid-cols-[60%_30%] lg:grid-cols-[60%_35%] xl:gap-32 lg:gap-20 mt-5 md:mx-20 mx-3'>
        <div className=' flex flex-col gap-10'>
          {showBlogs.length ? (
            showBlogs.map((blog) => {
              return <BlogBG key={blog.id} {...blog} />
            })
          ) : (
            <p className='text-lg text-black/40 my-4 mx-auto'>
              No blogs to display
            </p>
          )}
          <aside className='w-full flex gap-2 justify-center items-center my-5'>
            {btnArr.map((i, index) => {
              return (
                <a
                  href='#top'
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
        </div>
        <aside className='mx-0 lg:my-0 my-10'>
          <div className='grid grid-cols-[85%_15%] gap-1 w-full'>
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
          <div className='my-4 h-[50vh] overflow-y-scroll scrollbar'>
            {loading && (
              <p className='mx-auto text-sm font-semibold'>loading</p>
            )}
            {searchResults.length > 0 ? (
              <aside className=' flex flex-col gap-4 my-2'>
                {searchResults.slice(0, 5).map((blog) => {
                  return (
                    <article key={blog.id} className=' flex gap-2 w-[85%]'>
                      <div className='min-w-[80px] min-h-[80px] max-w-[80px] max-h-[80px] rounded-md overflow-hidden'>
                        <Image
                          src={blog.image}
                          alt={blog.title}
                          height={50}
                          width={50}
                          className='w-full h-full bg-no-repeat bg-center bg-cover'
                        />
                      </div>
                      <div className='flex flex-col gap-1'>
                        <Link
                          href={`/blog/${blog.id}`}
                          className='text-sm font-[500] text-black hover:text-black/40'
                        >
                          {blog.title}
                        </Link>
                        <span className='text-sm text-black/40'>
                          {blog.date}
                        </span>
                      </div>
                    </article>
                  )
                })}
              </aside>
            ) : (
              <p className='text-sm text-black/50 capitalize mx-auto'>
                no matches for the keyword
              </p>
            )}
          </div>
          <div className=' flex flex-col gap-4 my-2'>
            <h4 className='font-[500] sm:text-xl text-lg capitalize my-5'>
              recent post
            </h4>
            {blogs.slice(0, 5).map((blog) => {
              return (
                <article key={blog.id} className=' flex gap-2 w-[85%]'>
                  <div className='min-w-[80px] min-h-[80px] max-w-[80px] max-h-[80px] rounded-md overflow-hidden'>
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      height={50}
                      width={50}
                      className='w-full h-full bg-no-repeat bg-center bg-cover'
                    />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <Link
                      href={`/blog/${blog.id}`}
                      className='text-sm font-[500] text-black hover:text-black/40'
                    >
                      {blog.title}
                    </Link>
                    <span className='text-sm text-black/40'>{blog.date}</span>
                  </div>
                </article>
              )
            })}
          </div>
        </aside>
      </section>

      <FRS />
    </main>
  )
}
