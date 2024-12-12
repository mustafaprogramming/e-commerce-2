import FRS from '@/app/components/ReturnBanner'
import { Banner } from '../../components/Banner'
import { Clock3, MapPin  , Phone } from 'lucide-react'

export default function Contact() {
  return (
    <main className={` flex flex-1 flex-col `}>
      <Banner text='Contact' />
      <section className='lg:p-20 p-5 flex flex-col gap-10'>
        <div className='flex flex-col gap-3 mx-auto text-center'>
          <h1 className='lg:text-3xl md:text-2xl sm:text-xl text-lg font-[600]'>Get In Touch With Us</h1>
          <p className='sm:text-sm text-xs text-black/40 max-w-[600px]'>For More Information About Our Product & Services. Please Feel Free To Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!</p>
        </div>
        <aside className='grid md:grid-cols-[40%_60%] gap-20 lg:px-32 lg:py-20'>
          <article className='flex items-stretch flex-col gap-4 xs:px-10'>
            <div className='grid  grid-cols-[20%_80%]'>
              <MapPin fill='#000' color='#fff' className=' w-full' />
              <div className='flex flex-col gap-2 '>
                <h1 className='font-semibold text-lg'>Address</h1>
                <p className='text-sm'>236 5th SE Avenue, New York NY10000, United States</p>
              </div>
            </div>
            <div className='grid  grid-cols-[20%_80%]'>
              <Phone fill='#000' color='#fff' className=' w-full' />
              <div className='flex flex-col gap-2 '>
                <h1 className='font-semibold text-lg'>Phone</h1>
                <p className='text-sm flex flex-col'>
                  <span>Mobile: +(84) 546-6789
                  </span>
                  <span>Hotline: +(84) 456-6789</span>
                </p>
              </div>
            </div>
            <div className='grid  grid-cols-[20%_80%]'>
              <Clock3 fill='#000' color='#fff' className=' w-full' />
              <div className='flex flex-col gap-2 '>
                <h1 className='font-semibold text-lg'>Working Time</h1>
                <p className='text-sm flex flex-col'>
                  <span>Monday-Friday: 9:00 - 22:00</span>
                  <span>Saturday-Sunday: 9:00 - 21:00</span>
                </p>
              </div>
            </div>
          </article>
          <form action="" className='flex flex-col gap-10'>
              <div className='input-field'>
                <label htmlFor='name' className='label'>Your Name</label>
                <input type='text' id='name' name='name' className='input' placeholder='ABC' required />
              </div>
              <div className='input-field'>
                <label htmlFor='email' className='label'>Email address</label>
                <input type='email' id='email' name='email' className='input' placeholder='ABC@gmail.com' required />
              </div>
            <div className='input-field'>
                <label htmlFor='subject' className='label'>subject</label>
                <input type='text' id='subject' name='subject' className='input' placeholder='This is an optional' />
            </div>
            <div className='input-field'>
                <label htmlFor='message' className='label'>message</label>
                <textarea id='message' placeholder='Hi! i’d like to ask about' name='message' className='input'  required />
            </div>
            <button type='submit' className='btn w-fit py-1 px-10 rounded-lg'>submit</button>
          </form>
        </aside>
      </section>
      <FRS />
    </main>
  )
}
