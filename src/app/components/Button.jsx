
export function SecondaryButton({big=false,text,dark=false,full=false}) {
 return (
  <button className={` bg-transparent border-b-2 ${dark ? 'border-b-black':'border-b-white text-white'} capitalize font-[500] pb-2 hover:border-b-transparent hover:opacity-65 transition-all duration-300 text-sm ${big?'lg:text-xl':''}${full?'w-full place-items-center':'w-fit'}`}>{text}</button>
 )
}

export function MainButton({text, dark=false, full=false , large=false,round=false }) {
 return (
  <button className={`overflow-hidden w-fit truncate transition-all duration-700 ease-out  border capitalize ${dark ? 'text-black bg-transparent border-black hover:bg-black hover:text-white' : 'text-white hover:bg-zinc-800 hover:border-zinc-800'} ${full ? 'grid place-items-center w-full':''} ${large ? ' xs:px-10 xs:py-2 py-1 px-5 xs:text-base text-sm ':'xs:py-1 py-0.5 xs:px-5 px-2.5 sm:text-sm text-[10px]'} ${round?'rounded-md':''}`}>
  {text}
  </button>
 )
}

