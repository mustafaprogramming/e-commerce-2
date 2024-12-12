import Image from 'next/image'
import { SecondaryButton } from './Button'
import Link from 'next/link'
import { Clock4, Calendar, Tag, UserRound } from 'lucide-react'
import { blogType } from '../data'

export function BlogSM({ id, title, image, time, date }: blogType) {
  return (
    <article
      className={`group flex flex-col gap-5 max-w-[400px] transition-all duration-500 hover:shadow-xl scale-95 hover:scale-100 hover:-translate-y-3 pb-10`}
    >
      <div className=' rounded-2xl group-hover:rounded-t-md group-hover:rounded-b-none transition-all duration-500  overflow-hidden w-full h-[350px]'>
        <Image
          src={image}
          alt={title}
          height={300}
          width={300}
          className='w-full h-full bg-cover bg-center bg-no-repeat'
        />
      </div>
      <div className='flex flex-col gap-2'>
        <h3 className='text-[#434343] font-[500] line-clamp-1'>{title}</h3>
        <Link href={`/blog/${id}`}>
          <SecondaryButton text={'Read More'} dark big />
        </Link>
        <div className='flex gap-4 w-full justify-center text-[#000000c3]'>
          <span className='flex gap-1 items-center text-sm'>
            <Clock4 color='#000' size={16} />
            {time}
          </span>
          <span className='flex gap-1 items-center text-sm'>
            <Calendar color='#000' size={16} />
            {date}
          </span>
        </div>
      </div>
    </article>
  )
}
export default function BlogBG(prop: blogType) {
  const { image, title, id, date, desc, author, tag } = prop
  return (
    <article className=' flex flex-col gap-3 '>
      <div className=' w-full h-[60vh] rounded-xl overflow-hidden'>
        <Image
          src={image}
          alt={title}
          height={400}
          width={700}
          className='w-full h-full bg-no-repeat bg-cover'
        />
      </div>
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
      </div>
      <h1 className='text-lg sm:text-xl md:text-2xl  capitalize font-[500]'>
        {title}
      </h1>
      <p className='text-sm text-black/40 line-clamp-3'>{desc}</p>
      <Link href={`/blog/${id}`}>
        <SecondaryButton text='view more' dark />
      </Link>
    </article>
  )
}
