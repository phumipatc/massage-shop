import Reservation from "@/types/reservation";
import Image from "next/image";
import dayjs from "dayjs";

export default function ReservationCard({profile, reservation, selectReservationToEdit, onOpenModal}: {profile: Object, reservation: Reservation, selectReservationToEdit: Function, onOpenModal: Function}) {

	return (
		// background color: rgba(240, 159, 156, 1)
		<div className='w-2/3 my-5 mx-auto md:w-5/6 md:h-64 bg-[#F09F9C] rounded-md shadow-lg md:flex overflow-hidden border-1 border-gray-600 hover:drop-shadow-2xl transition-all'>
			<div className='w-full md:w-2/3 h-1/2 md:h-full'>
                <div className='flex h-fit p-6 lg:pl-24 items-center gap-x-5 bg-[#632B6C] text-white'>
                    <h1 className='text-xl lg:text-3xl font-bold hover:text-clip'>{reservation.shop.name}</h1>    
					<button onClick={() => {selectReservationToEdit(reservation); onOpenModal()}}>
						<Image src='/img/edit.png' alt='edit' width={300} height={300} className='h-10 w-10'/>
					</button>
                </div>
                <div className='flex flex-col gap-1 pl-10 lg:pl-32 mt-2 md:mt-5 mb-2 md:mb-0'>
					<p className='text-base lg:text-xl font-semibold'>Date: {dayjs(reservation.bookingDate).format('MM/DD/YYYY')}</p>
					<p className='text-base lg:text-xl font-semibold'>Duration: {reservation.serviceMinute} minutes</p>
					<p className='text-base lg:text-xl font-semibold'>Telephone number: {reservation.shop.tel}</p>
					{profile?.data.role == 'admin' ?<p className='text-base lg:text-xl font-semibold'>Customer name: {reservation.user.name}</p> : null}
                </div>
            </div>
			<div className='w-full md:w-1/3 h-1/2 md:h-full md:shrink-0'>
				<Image width={1000} height={1000} src={reservation.shop.picture} alt={reservation.shop.name} className='md:h-full w-full object-cover'/>
			</div>
		</div>
	);
}