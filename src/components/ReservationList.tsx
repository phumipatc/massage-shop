import { Suspense } from "react"
import { LinearProgress } from "@mui/material"
import getUserProfile from "@/libs/getUserProfile"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import ReservationModal from "./ReservationModal"
import getBookings from "@/libs/getBookings"

export default async function ReservationList() {

	const session = await getServerSession(authOptions)
	let profile = null
	if(session && session.user.token){
		profile = await getUserProfile(session.user.token)
		console.log(profile)
	}
	const reservations = await getBookings(session?.user.token||"")

	return (
		<div className='flex flex-col gap-3 md:gap-6 m-5 mt-10 w-full items-center'>
			<Suspense fallback={<p>Loading...<LinearProgress /></p>}>
				<ReservationModal reservations={reservations} profile={profile}/>
			</Suspense>
        </div>
	)
}