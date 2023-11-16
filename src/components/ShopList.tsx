import getShops from "@/libs/getShops"
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"
import ShopModal from "./ShopModal"
import getUserProfile from "@/libs/getUserProfile"
import { getServerSession } from "next-auth"

export default async function ShopList() {

	const shops = await getShops()

	return (
		<div className='flex flex-col gap-3 md:gap-6 m-5 mt-10 w-full items-center'>
			<Suspense fallback={<p>Loading...<LinearProgress /></p>}>
				<ShopModal shops={shops} />
			</Suspense>
        </div>
	)
}