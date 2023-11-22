import Banner from '@/components/Banner'
import ShopListServer from '@/components/ShopListServer'
export default async function Home() {

  return (
    <main className='w-full h-full'>
      <Banner/>
      <div className='px-7 md:px-20 pt-10'>
        <h1 className='text-5xl m-5 font-bold'>Shop List</h1>
        <ShopListServer/>
      </div>
    </main>
  )
}
