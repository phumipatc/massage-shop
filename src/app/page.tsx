import Image from 'next/image'
import Banner from '@/components/Banner'
import ShopCard from '@/components/ShopCard'
export default function Home() {
  const mockShop = [
    {
      name: "BossYOYO's Massage Shop",
      address: "temp",
      priceLevel: 3,
      province: 'Bangkok',
      postalcode: '13100',
      picture: '/img/mock_shop1.jpg'
    },
    {
      name: "Rayong Massage Parlor",
      address: "temp",
      priceLevel: 2,
      province: 'Rayong',
      postalcode: '21000',
      picture: '/img/mock_shop2.jpg'
    },
    {
      name: "Top Massage",
      address: "temp",
      priceLevel: 1,
      province: 'Bangkok',
      postalcode: '13100',
      picture: '/img/mock_shop3.jpg'
    }
  ]
  return (
    <main className='w-full h-full'>
      <Banner/>
      <div className='px-7 md:px-20 pt-10'>
        <h1 className='text-5xl m-5 font-bold'>Shop List</h1>
        <div className='m-5 mt-8 px-5 flex'>
          <div className='flex gap-3 w-11/12'>
            <input className='border-2 border-gray-300 rounded-md px-2 w-7/12' type='text' placeholder='Shop Name'/>
            <button className='border-2 border-gray-300 rounded-md px-2'>Province</button>
            <button className='border-2 border-gray-300 rounded-md px-2'>Price level</button>
          </div>
          <button className='text-2xl font-semibold border-2 border-gray-300 rounded-md p-2 px-4'>Search</button>
        </div>
        <div className='flex flex-col gap-3 md:gap-6 m-5 mt-8 w-full items-center'>
          {mockShop.map((shop,index) => (
            <ShopCard key={index} shop={shop}/>
          ))}
        </div>
      </div>
    </main>
  )
}
