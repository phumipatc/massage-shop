import getShops from "@/libs/getShops"
import BookingModal from "./BookingModal"
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"

export default async function ShopList() {

	const shops = await getShops()
	// console.log(shops)

	return (
		<div className='flex flex-col gap-3 md:gap-6 m-5 mt-8 w-full items-center'>
			<Suspense fallback={<p>Loading...<LinearProgress /></p>}>
				<BookingModal shops={shops}/>
			</Suspense>
        </div>
	)
}