import Banner from '@/components/Banner'
import BookingModal from '@/components/BookingModal'
export default function Home() {

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
        <BookingModal />
      </div>
    </main>
  )
}
