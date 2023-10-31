import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <div className="h-screen w-screen relative">
        <Image src='/img/banner1.jpg' alt='banner1' width={0} height={0} layout="fill" objectFit="cover"/>
      </div>
    </main>
  )
}
