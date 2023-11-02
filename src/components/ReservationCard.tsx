import Reservation from "@/types/reservation";
import Image from "next/image";

export default function ReservationCard({reservation}: {reservation: Reservation}) {
	return (
		// background color: rgba(240, 159, 156, 1)
		<div className='w-2/3 my-5 mx-auto md:w-5/6 md:h-64 bg-[#F09F9C] rounded-md shadow-lg md:flex overflow-hidden border-1 border-gray-600'>
			<div className='w-full md:w-2/3 h-1/2 md:h-full'>
                <div className='flex justify-between h-1/4 pt-16 pl-6 lg:pl-24 items-center'>
                    <h1 className='text-2xl lg:text-3xl font-bold hover:text-clip'>{reservation.name}</h1>                    
                </div>
                <div className='flex flex-col gap-1 pt-5 pl-10 lg:pl-32 pb-10 mt-2 md:mt-5 mb-2 md:mb-0'>
					<p className='text-base lg:text-xl font-semibold'>Date: {reservation.date}</p>
					<p className='text-base lg:text-xl font-semibold'>Duration: {reservation.duration}</p>
					<p className='text-base lg:text-xl font-semibold'>Telephone number: {reservation.phone}</p>
                </div>
            </div>
			<div className='w-full md:w-1/3 h-1/2 md:h-full md:shrink-0'>
					<Image width={1000} height={1000} src={reservation.picture} alt={reservation.name} className='md:h-full w-full object-cover'/>
			</div>
		</div>
	);
}