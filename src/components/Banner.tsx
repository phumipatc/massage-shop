import Image from 'next/image'

export default function Banner(){
    return (
        <div className="h-[100vh] relative">
            <Image src='/img/banner1.jpg' alt='banner1' width={0} height={0} layout="fill" objectFit="cover"/>
        </div>
    )
}