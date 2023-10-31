import Shop from '@/types/shop'
export default function ShopCard({ shop }: { shop: Shop }) {
    return (
        <div className='w-5/6 h-64 bg-white rounded-md shadow-md flex m-5'>
            <div className='w-1/3 h-full'>
                <img src={shop.picture} alt={shop.name} className='h-full w-full object-cover rounded-l-md'/>
            </div>
            <div className='w-2/3 h-full rounded-tr-md'>
                <div className='flex justify-between bg-[#632B6C] rounded-tr-md h-1/4 pl-5 items-center text-white'>
                    <h1 className='text-2xl font-bold'>{shop.name}</h1>
                    <div className='h-full bg-black flex items-center justify-center rounded-tr-md w-32'>
                        <h1 className='text-lg font-semibold'>{"฿".repeat(shop.priceLevel)}</h1>
                    </div>
                </div>
                <div className='flex gap-2 justify-between h-3/4'>
                    <div className='flex flex-col gap-1 pl-8 mt-5'>
                        <h1 className='text-lg font-semibold'>Address: {shop.address}</h1>
                        <h1 className='text-lg font-semibold'>Province: {shop.province}</h1>
                        <h1 className='text-lg font-semibold'>Postal code: {shop.postalcode}</h1>
                    </div>
                    <button className='bg-[#C76B98] text-white h-full rounded-br-md w-32'>Book Now</button>
                </div>
            </div>
        </div>
    )
}