import Reservation from "@/types/reservation";

export default async function createBooking(token: string, booking:Reservation) {
	const res = await fetch('http://localhost:5000/api/v1/shops/' + booking.shopId + '/bookings',{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			bookingDate: booking.date,
			serviceMinute: booking.duration,
			createdAt: booking.createdAt
		})
	})

	if(!res.ok){
		throw new Error("Failed to create booking for" + booking.shopId)
	}

	return await res.json()
}