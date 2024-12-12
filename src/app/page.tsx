'use client'
import Image from 'next/image'
import Hero from './components/Hero'
import {  useGlobalContext } from '@/app/GlobalContext'
import { ProductType,blogType } from '@/app/data'
import { MainButton, SecondaryButton } from './components/Button'
import { BlogSM } from './components/Blog'
import Link from 'next/link'
import { useEffect } from 'react'
import Recommended from './components/Recommended'

export default function Home() {
  const { products, blogs } = useGlobalContext() as {
    products: ProductType[]
    blogs: blogType[]
  }
  const blogsArray = blogs.slice(0, 3)
  useEffect(() => {
    const elements = document.querySelectorAll('.show-on-scroll')

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('hide')
        }
      })
    })

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])
  return (
    <main className={` flex flex-1 flex-col `}>
      <section className='lg:h-screen md:h-[80vh] xs:h-[60vh] h-[50vh]  bg-[#FBEBB5] relative mb-10 overflow-hidden'>
        <Hero
          src={products[16].image[0]}
          btnText='shop now'
          title={products[16].title}
          height={600}
          width={400}
          link={`/shop/${products[16].id}`}
          full
        />
      </section>
      <section
        className={`show-on-scroll hide lg:h-[60vh] md:h-[50vh] sm:h-[40vh] h-[80vh] grid grid-cols-1 sm:grid-cols-2 relative py-5 sm:px-20 px-12 sm:gap-10 gap-5 bg-[#FAF4F4]`}
      >
        <Hero
          src={products[17].image[0]}
          link='/shop'
          btnText='view more'
          title={products[17].title}
          height={300}
          width={300}
        />
        <Hero
          src={products[18].image[0]}
          link='/shop'
          btnText='view more'
          title={products[18].title}
          height={300}
          width={300}
        />
      </section>
      <Recommended
        text='Find a bright ideal to suit your taste with our great selection of suspension, floor and table lights.'
        title='top picks for you'
      />
      <section className='show-on-scroll hide w-full bg-[#FFF9E5] grid sm:grid-cols-[60%_40%] grid-cols-1 overflow-hidden pb-5'>
        <div className='max-w-[700px] h-full'>
          <Image
            src={products[13].image[0]}
            alt={products[13].title}
            width={700}
            height={600}
            quality={100}
            className=' w-full h-full '
          />
        </div>
        <aside className=' w-full flex items-center justify-center flex-col gap-2'>
          <p className='font-[500] md:text-xl sm:text-lg text-base '>
            New Arrivals
          </p>
          <h2 className='lg:text-4xl md:text-3xl sm:text-2xl text-xl font-bold mb-3'>
            {products[13].title}
          </h2>
          <Link href={`/shop/${products[13].id}`}>
            <MainButton text={'order now'} dark large />
          </Link>
        </aside>
      </section>
      <section className='show-on-scroll hide text-center md:my-10 my-5 md:mx-20 sm:mx-10 mx-2'>
        <h2
          className={`font-[500] capitalize lg:text-4xl md:text-3xl sm:text-2xl text-xl mb-3`}
        >
          Our Blogs
        </h2>
        <p className='opacity-50 sm:font-[500]'>
          Find a bright ideal to suit your taste with our great selection
        </p>
        <aside className='place-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-16 mb-8'>
          {blogsArray.map((product) => {
            return <BlogSM key={product.id} {...product} />
          })}
        </aside>
        <Link href={'/blog'} className='w-full '>
          <SecondaryButton text={'view all post'} dark />
        </Link>
      </section>
      <section className='show-on-scroll hide relative flex justify-center items-center bg-[#FAF4F4] h-[60vh]'>
        <div className='absolute right-0 top-0 z-0 w-full h-full'>
          <Image
            src={'/instagrambg.png'}
            alt='instagram'
            height={400}
            width={500}
            className='w-full h-full bg-cover bg-center bg-no-repeat'
          />
        </div>
        <div className='flex gap-3 flex-col relative '>
          <h2 className='lg:text-6xl md:text-5xl sm:text-4xl xs:text-3xl text-2xl font-bold text-center'>
            Our Instagram
          </h2>
          <p className='lg:text-xl sm:text-lg text-base font-[500] text-center'>
            Follow our store on Instagram
          </p>
          <a
            target='_blank'
            className='bg-[#FAF4F4] w-fit shadow-xl mx-auto hover:shadow-lg xs:hover:px-16 xs:px-12 px-8 hover:px-10  font-[500] xs:py-3 py-1.5 transition-all duration-500 rounded-full text-center'
            href={'https://www.instagram.com/'}
          >
            Follow Us
          </a>
        </div>
      </section>
    </main>
  )
}
