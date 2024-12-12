import Image from "next/image";
import { ChevronRight } from 'lucide-react';
import Link from "next/link";
type propType={
  text:string,
}
export function Banner(prop:propType) {
  const {text}=prop;
  return <section className="w-full h-[40vh] mt-[10vh] flex justify-center items-center relative overflow-hidden">
      <Image src={'/herobgimage.png'} alt="background image" height={300} width={1000} className="w-full h-full bg-no-repeat absolute top-0 left-0 z-0 bg-cover" />
      <div className="flex flex-col relative items-center">
      <Image src={'/bglogo.png'} alt="background logo" height={60} width={60} className="bg-no-repeat bg-cover translate-y-2" />
      <div className="flex flex-col gap-3">
        <h1 className=" md:text-5xl sm:text-4xl xs:text-3xl text-2xl font-[500] text-center">{text}</h1>
        <p className="font-[500] flex gap-1 mx-auto items-center text-sm"><Link href={'/'}>Home</Link><ChevronRight color="#000" size={16} /><span className="font-normal">{text}</span></p>
      </div>
      </div>
    </section>;
}
  