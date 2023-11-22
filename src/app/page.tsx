import Banner from '@/components/Banner'
import ShopListServer from '@/components/ShopListServer'
export default async function Home() {

  return (
    <main className='w-full h-full'>
      <Banner/>
      <div className='px-1 md:px-20 pt-10'>
        <h1 className='text-3xl text-center md:text-left md:text-5xl m-2 md:m-5 font-bold'>Shop List</h1>
        <ShopListServer/>
      </div>
    </main>
  )
}
