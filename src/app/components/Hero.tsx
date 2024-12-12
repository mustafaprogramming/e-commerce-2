import Image from "next/image";
import {SecondaryButton} from './Button'
import Link from "next/link";
type propType={
  full?:boolean,
  height:number,
  width:number,
  title:string,
  btnText:string,
  src:string,
  link:string,
}

export default function Hero(prop:propType) {
  const {full,width,height,btnText,title,src,link}=prop;
 return (
   <section className={`${full?'mt-[10vh]':''} w-full relative h-full `}>
    <Image src={src} alt={title}  height={height} width={width} className={`${full?'sm:w-[50%] w-[60%] bottom-0':'w-full max-w-[350px] h-full top-0'}  bg-cover bg-no-repeat absolute right-0  `} />
    <aside className={` flex flex-col ${full?'gap-10   bottom-[40%] left-[15%]':' bottom-[10%] left-[15%] gap-5'} absolute`}>
      <h1 className={`${full?'lg:text-6xl md:text-5xl sm:text-4xl xs:text-3xl text-2xl max-w-[80%]':'lg:text-2xl md:text-xl xs:text-lg  text-base'} capitalize font-[500] `}>{title}</h1>
      <Link href={link}>
        <SecondaryButton text={btnText} big={full} dark />
      </Link>
    </aside>
   </section>
 )
}