'use client'
import Link from "next/link";
import {Links,IconLinks,Help} from '../data'
import { SecondaryButton } from "./Button";
import { usePathname } from "next/navigation";



export default function Footer() {
  const pathname = usePathname();

 return (
   <footer className="border-t sm:mb-0 mb-[8vh] bg-white sm:pt-20 pt-10 sm:px-20 px-10 ">
    <section className="grid grid-cols-1 lg:grid-cols-[70%_30%]">
      <div className="grid grid-cols-2 xs:grid-cols-3 ">
        <div className="flex flex-col gap-4 mb-10">
          <h1 className="font-[500] opacity-50">Links</h1>
          <ul className="flex flex-col gap-2">
            {Links.map((link,index)=>{
              return <li key={index}><Link className={` capitalize font-[500] border-b ${pathname===link.pathLink?'border-b-black ':'hover:border-b-black border-transparent'} transition-all duration-300 `} href={link.pathLink}>{link.pathname}</Link></li>
            })}
          </ul>
        </div>
        <div className="flex flex-col gap-4 mb-10">
          <h1 className="font-[500] opacity-50">Users</h1>
          <ul className="flex flex-col gap-2">
            {IconLinks.map((link,index)=>{
              return <li key={index}><Link className={`capitalize font-[500] border-b ${pathname===link.pathLink?'border-b-black ':'hover:border-b-black border-transparent'} transition-all duration-300`} href={link.pathLink}>{link.pathname}</Link></li>
            })}
          </ul>
        </div>
        <div className="flex flex-col gap-4 mb-10">
          <h1 className="font-[500] opacity-50">Help</h1>
          <ul className="flex flex-col gap-2">
            {Help.map((link,index)=>{
              return <li key={index}><Link className={`capitalize font-[500] border-b ${pathname===link.pathLink?'border-b-black ':'hover:border-b-black border-transparent'} transition-all duration-300`} href={link.pathLink}>{link.pathname}</Link></li>
            })}
          </ul>
        </div>
      </div>
     <div className="w-full mt-10 flex flex-col justify-center">
     <h1 className="font-[500] opacity-50">News Letter</h1>
     <div className="my-5 grid grid-cols-[68%_2%_30%] gap- w-full  relative ">
      <input type="email" placeholder="Enter Your Email Address" className="border-b-2 border-b-black outline-none bg-transparent"/>
      <span></span>
      <SecondaryButton text={'Subscribe'} full dark />
     </div>
      <p className="opacity-50 my-5">
      400 University Drive Suite 200 Coral Gables,<br />
      FL 33134 USA
      </p>
     </div>
    </section>
    <aside className="my-10 px-10 py-4 border-t  ">
      <span>2022 Meubel House. All rights reverved</span>
    </aside>
   </footer>
 )
}