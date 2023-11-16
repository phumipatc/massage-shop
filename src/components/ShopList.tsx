import getShops from "@/libs/getShops"
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"
import ShopModal from "./ShopModal"
import getUserProfile from "@/libs/getUserProfile"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export default async function ShopList() {

	const shops = await getShops()
	const session = await getServerSession(authOptions)
	let profile = null
	if(session && session.user.token){
		profile = await getUserProfile(session.user.token)
		console.log(profile)
	}

	return (
		<div className='flex flex-col gap-3 md:gap-6 m-5 mt-10 w-full items-center'>
			<Suspense fallback={<p>Loading...<LinearProgress /></p>}>
				<ShopModal profile={profile} shops={shops} />
			</Suspense>
        </div>
	)
}