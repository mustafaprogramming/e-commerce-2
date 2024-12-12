'use client'
import { useGlobalContext } from '@/app/GlobalContext'
import { blogType } from '@/app/data'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { BookOpen, Calendar, ChevronRight, SearchIcon, Tag, UserRound } from 'lucide-react'
import FRS from '@/app/components/ReturnBanner'

export default function User() {
  const { id } = useParams()
  const { blogs } = useGlobalContext() as { blogs: blogType[] }
  const [blog, setBlog] = useState<blogType | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [searchResults, setSearchResults] = useState<blogType[]>([])
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword)
  const search = useCallback(() => {
      setLoading(true)
  
      const keywordLower = debouncedKeyword.toLowerCase()
      const searchArray = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(keywordLower)
      )
  
      setSearchResults(searchArray)
      setLoading(false)
    }, [blogs, debouncedKeyword, setSearchResults])
    useEffect(() => {
      search()
    }, [search])
    useEffect(() => {
      const handler = setTimeout(() => setDebouncedKeyword(keyword), 300) // Debounce for 300ms
      return () => clearTimeout(handler) // Clear timeout on keyword change
    }, [keyword])
  
  useEffect(() => {
    setLoading(true)
    const item = blogs.find((el) => el.id === id)
    if (item) {
      setBlog(item)
      setLoading(false)
    } else if (!item) {
      setLoading(false)
      setError(true)
    }
  }, [id, blogs])

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='w-16 h-16 border-4 border-dashed rounded-full animate-spin border-black'></div>
      </div>
    )
  }
  if (!blog || error) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-white via-black/50 to-black'>
        <div className='text-center text-white px-6 py-12 md:px-12 md:py-16'>
          <h1 className='text-5xl font-extrabold mb-4'>Blog Not Found</h1>
          <p className='text-lg mb-6'>
            Sorry&#39; we couldn&#39;t find the blog you were looking for.
          </p>
          <Link
            href='/blog'
            className='inline-block bg-black/80 text-white px-6 py-3 rounded-lg text-lg hover:bg-black transition duration-300 ease-in-out'
          >
            Go Back to blog
          </Link>
        </div>
      </div>
    )
  }

  const { image, title, date, time, desc, author, tag } = blog
  return (
    <main className={` flex flex-1 flex-col sm:mt-10 mt-14`}>
      <div className='w-full md:px-20 px-5 py-5 sm:py-10 flex gap-2 text-sm font-[500]'>
        <Link href={'/'} className='opacity-40'>Home</Link>
        <ChevronRight color='#000' size={20} />
        <Link href={'/blog'} className='opacity-40'>Blog</Link>
        <ChevronRight color='#000' size={20} />
        <span className='border-l border-black pl-5 ml-1 line-clamp-1'>{title}</span>
      </div>
      <article className='lg:px-10 px-4 grid md:grid-cols-2 grid-cols-1  gap-10  sm:my-10 mt-10'>
        <div className=' w-full sm:h-[60vh] h-[30vh]  overflow-hidden'>
          <Image
            src={image}
            alt={title}
            height={400}
            width={700}
            className='w-full h-full bg-no-repeat bg-cover'
          />
        </div>
        <div className='sm:my-4 flex flex-col gap-5'>
          <div className=' text-sm text-black/50 flex gap-x-8 gap-y-2 flex-wrap'>
            <span className='flex gap-1 items-center'>
              <UserRound fill='#7d7d7d' color='#fff' size={18} />
              {author}
            </span>
            <span className='flex gap-1 items-center'>
              <Calendar fill='#7d7d7d' color='#fff' size={18} />
              {date}
            </span>
            <span className='flex gap-1 items-center'>
              <Tag fill='#7d7d7d' color='#fff' size={18} />
              {tag}
            </span>
            <span className='flex gap-1 items-center'>
              <BookOpen fill='#7d7d7d' color='#7d7d7d' size={18} />

              {time}
            </span>
          </div>
          <h1 className='text-lg sm:text-xl md:text-2xl  capitalize font-[500]'>
            {title}
          </h1>
          <p className='text-sm text-black/40'>{desc}</p>
        </div>
      </article>
      <section className='mx-4 my-4 grid grid-cols-1 md:grid-cols-[70%_30%] gap-10 md:px-10'>
        <div className=' flex flex-col gap-4 my-2'>
          <h4 className='font-[500] lg:text-3xl md:text-2xl sm:text-xl text-lg capitalize my-5'>
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
                    className=' md:text-lg text-base font-[500] text-black hover:text-black/40'
                  >
                    {blog.title}
                  </Link>
                  <span className='md:text-base text-sm text-black/40'>{blog.date}</span>
                </div>
              </article>
            )
          })}
        </div>
        <aside>
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
          <div className='my-4 h-[60vh]  overflow-y-scroll scrollbar'>
            {loading && <p className='mx-auto text-sm font-semibold'>loading</p>}
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
                        <span className='text-sm text-black/40'>{blog.date}</span>
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
        </aside>
      </section>
      <FRS />
    </main>
  )
}
