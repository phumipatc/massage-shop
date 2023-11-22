import Shops from "@/types/Shops"
import ShopList from "./ShopList"
import getShops from "@/libs/getShops"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import getUserProfile from "@/libs/getUserProfile"

export default async function ShopListServer() {
	let shops = await getShops()
	const session = await getServerSession(authOptions)
	let profile = null
	if(session && session.user.token){
		profile = await getUserProfile(session.user.token)
		console.log(profile)
	}

	return (
		<div>
			<ShopList profile={profile} shops={shops}/>
		</div>
	)
}