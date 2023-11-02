import ReservationCard from "@/components/ReservationCard";

export default function reservations() {
	const mockReservations = [
		{
			name: "BossYOYO's Massage Shop",
			date: "12-10-2023 12:00",
			duration: 30,
			phone: '0812345678',
			picture: "/img/mock_reservation_1.png"
		},
		{
			name: "Rayong Massage Parlor",
			date: "12-10-2023 12:00",
			duration: 60,
			phone: '0812345678',
			picture: "/img/mock_reservation_1.png"
		},
		{
			name: "Top Massage",
			date: "12-10-2023 12:00",
			duration: 90,
			phone: '0812345678',
			picture: "/img/mock_reservation_1.png"
		}
	]
	return (
		<div className="w-full h-full mt-20">
			<h1 className='text-5xl font-bold text-center pt-5 pb-5'>My reservations</h1>
			{
				mockReservations.map((reservation, index) => (
					<ReservationCard key={index} reservation={reservation} />
				))
			}
		</div>
	);
}