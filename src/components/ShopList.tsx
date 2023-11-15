import getShops from "@/libs/getShops"
import BookingModal from "./BookingModal"

export default async function ShopList() {

	const shops = await getShops()
	// console.log(shops)

	return (
		<div className='flex flex-col gap-3 md:gap-6 m-5 mt-8 w-full items-center'>
		  <BookingModal shops={shops}/>
        </div>
	)
}