'use client'
import FRS from '@/app/components/ReturnBanner'
import { Banner } from '../../components/Banner'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function User() {
  const [register, setRegister] = useState(false)
  const [formHeight, setFormHeight] = useState(0)
  const form1 = useRef<HTMLFormElement | null>(null);
  const form2 = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (form1.current&&form2.current) {
      const height1 = form1.current.getBoundingClientRect().height+60;
      const height2 = form2.current.getBoundingClientRect().height+60;
      const height=register?height2:height1;
      setFormHeight(height);
    }
  }, [register])
  return (
    <main className={` flex flex-1 flex-col `}>
      <Banner text='User' />
      <section className='flex justify-center my-10'>
        <div className={` relative flex  w-[400px] overflow-hidden mx-2 border rounded-lg transition-all duration-500 `} style={{height:formHeight}}>
          <form
            ref={form1}
            action=''
            className={`absolute top-0 left-0 transition-all duration-500 ${
              register ? '-translate-x-[125%]' : 'translate-x-[5%]'
            } flex flex-col gap-10 my-10 w-[90%] `}
          >
            <fieldset className='flex flex-col gap-5 pt-10 pb-5'>
              <legend className='sm:text-4xl text-3xl  font-[500]'>
                Log In
              </legend>
              <div className='input-field'>
                <label htmlFor='email-name' className='label'>
                  username or email address
                </label>
                <input
                  type='text'
                  id='email-name'
                  name='email-name'
                  className='input'
                  required
                />
              </div>
              <div className='input-field'>
                <label htmlFor='last-name' className='label'>
                  password
                </label>
                <input
                  type='password'
                  id='last-name'
                  name='last-name'
                  className='input'
                  required
                />
              </div>
              <div className='flex gap-2'>
                <input
                  type='checkbox'
                  id='remember-me'
                  name='remember-me'
                  className=' accent-black w-10'
                />
                <label htmlFor='remember-me' className='label'>
                  Remember me
                </label>
              </div>
            </fieldset>
            <div className='flex flex-col gap-3'>
              <button className='btn rounded-lg py-2 px-8 hover:px-10 '>
                log in
              </button>
              <Link
                href={'/forgot-password'}
                className='text-black/40 text-sm hover:text-black'
              >
                Lost Your Password?
              </Link>
            </div>
          </form>
          <form
            ref={form2}
            action=''
            className={`absolute top-0 left-0 transition-all duration-500 ${
              register ? 'translate-x-[5%]' : 'translate-x-[125%]'
            } flex flex-col gap-10 my-10 w-[90%]`}
          >
            <fieldset className='flex flex-col gap-5 pt-10'>
              <legend className='sm:text-4xl text-3xl  font-[500]'>
                Register
              </legend>
              <div className='input-field'>
                <label htmlFor='email' className='label'>
                  email address
                </label>
                <input
                  type='text'
                  id='email'
                  name='email'
                  className='input'
                  required
                />
              </div>
              <p className='text-xs'>
                A link to set a new password will be sent to your email address.
              </p>
              <p className='text-xs'>
                Your personal data will be used to support your experience
                throughout this website, to manage access to your account, and
                for other purposes described in our{' '}
                <strong>privacy policy.</strong>
              </p>
            </fieldset>
            <button className='btn rounded-lg py-2 px-8 hover:px-10 '>
              Register
            </button>
          </form>
        </div>
      </section>
      <button
        onClick={() => setRegister(!register)}
        className='text-black/40 hover:text-black mb-5'
      >
        {register ? 'Log in instead?' : 'Register instead?'}
      </button>
      <FRS />
    </main>
  )
}
