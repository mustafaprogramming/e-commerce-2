'use client'
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {Links,IconLinks} from '../data'
import { SideCart } from "./Cart";

export type cartOpenClose=()=>void


export default function Header() {
  const PATHNAME = usePathname();
  const pathname=`/${PATHNAME.split('/')[1]}`
  const [sideCartOpen,setSideCartOpen]=useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
        if (headerRef.current) {
          const height = headerRef.current.getBoundingClientRect().height;
          if (window.scrollY > height) {
            setScrolled(true);
          } else {
            setScrolled(false);
          }
        }
      
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const openCart:cartOpenClose=()=>{
    setSideCartOpen(true);
  }
  const closeSideCart:cartOpenClose=()=>{
    setSideCartOpen(false);
  }
  return (
    <header ref={headerRef} className={`${scrolled?'bg-white border-b':'bg-transparent border-b border-b-transparent'}  fixed top-0 left-0 transition-all duration-400 flex  w-full h-[10vh] items-center font-[500] z-10 `} >
      {sideCartOpen && <div onClick={closeSideCart} className="bg-black/50 fixed top-0 bottom-0 w-screen h-screen"></div>}
      <SideCart closeSideCart={closeSideCart} sideCartOpen={sideCartOpen} />
      
      <ul className={` capitalize flex lg:pl-32 md:gap-16 sm:gap-10 xs:gap-8 gap-4 mx-auto  w-fit `}>
        {Links.map((link,index)=>{
          return <li key={index}><Link prefetch className={`${pathname===link.pathLink?'border-b-black':'border-b-transparent'} border-b-2 transition-all duration-500 hover:border-b-black/50`} href={link.pathLink}>{link.pathname}</Link></li>
        })}
      </ul>
      <ul className={` flex justify-around sm:relative fixed bottom-0 left-0 sm:bg-transparent sm:border-t-0 border-t border-t-black/50 bg-white gap-4 lg:mr-20 md:mr-10 sm:mr-5 sm:w-fit w-full h-fit px-4 py-2 z-40`}>
        {IconLinks.map((link,index)=>{
          if(link.pathname=='cart'){
            return (
              <li key={index}>
                    <button onClick={openCart} className={`${pathname===link.pathLink?'scale-105 border-b border-b-black pb-1 ':''} flex gap-x-4 items-center capitalize hover:scale-105 w-full transition-all sm:flex-row flex-col `}>
                    {link.icon}
                    <span className={` sm:hidden `}>
                      {link.pathname}
                    </span>
                    </button>
                  </li>
            )
          };
          return  <li key={index}>
                    <Link href={link.pathLink} className={`${link.pathLink=== pathname?'scale-105 border-b  border-b-black pb-1 ':''} flex gap-x-4 items-center capitalize hover:scale-105 sm:flex-row flex-col transition-all`}>
                    {link.icon}
                    <span className={` sm:hidden `}>
                      {link.pathname}
                    </span>
                    </Link>
                  </li>
        })}
      </ul>
    </header>
  )
}
