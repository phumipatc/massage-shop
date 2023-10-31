import Image from 'next/image'

export default function Banner(){
    return (
        <div className="w-full h-[100vh] relative">
            <Image src='/img/banner1.jpg' alt='banner1' width={0} height={0} layout="fill" objectFit="cover" className='pointer-events-none'/>
            <div className='absolute bottom-10 right-10 w-2/5 h-[80%] bg-[#3F3F3F]/40 z-40 rounded-3xl flex flex-col'>
                <div className='flex flex-col '>
                    <h1 className='text-5xl font-bold text-white'>Discover Your Ultimate Relaxation Oasis</h1>
                </div>
            </div>
        </div>
    )
}