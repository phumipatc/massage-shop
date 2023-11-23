import Shop from '@/types/shop'
import Image from 'next/image'
export default function ShopCard({ profile, shop, onBooking, onOpenBookingModal, onSelectShopToEdit, onOpenEditModal }: { profile:Object, shop: Shop, onBooking: Function, onOpenBookingModal: Function, onSelectShopToEdit: Function, onOpenEditModal: Function }) {

    return (
        <div className='w-2/3 md:w-5/6 md:h-64 bg-white rounded-md shadow-md md:flex overflow-hidden border-1 border-gray-600 hover:drop-shadow-2xl transition-all'>
            <div className='w-full md:w-1/3 h-1/2 md:h-full md:shrink-0'>
                <Image width={1000} height={1000} src={shop.picture} alt={shop.name} className='md:h-full w-full object-cover'/>
            </div>
            <div className='w-full md:w-2/3 h-1/2 md:h-full'>
                <div className='flex justify-between bg-[#632B6C] h-1/4 pl-5 items-center text-white'>
                    <div className='flex'>
                        <h1 className='text-xl lg:text-2xl font-bold truncate hover:text-clip'>{shop.name}</h1>
                        {profile?.data.role == 'admin'
                            ?<Image width={1000} height={1000} src='/img/edit.png' alt='edit' className='ml-4  w-6 h-6 ml-2 cursor-pointer' onClick={()=>{onSelectShopToEdit(shop); onOpenEditModal();}}/>
                            :null
                        }
                    </div>
                    <div className='h-full bg-black items-center justify-center w-24 lg:w-32 flex'>
                        <h1 className='text-lg font-semibold'>{"฿".repeat(shop.priceLevel)}</h1>
                    </div>
                </div>
                <div className='flex gap-2 justify-between h-3/4 items-center'>
                    <div className='flex flex-col gap-1 pl-8 md:mb-0'>
                        <p className='text-sm sm:text-base lg:text-lg font-semibold'>Address: {shop.address}</p>
                        <p className='text-sm sm:text-base lg:text-lg font-semibold'>Province: {shop.province}</p>
                        <p className='text-sm sm:text-base lg:text-lg font-semibold'>Postal code: {shop.postalcode}</p>
                        <p className='text-sm sm:text-base lg:text-lg font-semibold'>Phone number: {shop.tel}</p>
                    </div>
                    <button className='bg-[#C76B98] text-white h-32 md:h-full w-24 lg:w-32' onClick={()=>{onBooking(shop); onOpenBookingModal();}}>
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    )
}