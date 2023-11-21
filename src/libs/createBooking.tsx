import Reservation from "@/types/reservation";

export default async function createBooking(token: string, booking:Reservation|any) {
	if(!booking.bookingDate || !booking.serviceMinute || !booking.createdAt || !booking.shop.id){
        throw new Error("Missing input")
    }
	const res = await fetch('http://localhost:5000/api/v1/shops/' + booking.shop.id + '/bookings',{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			bookingDate: booking.bookingDate,
			serviceMinute: booking.serviceMinute,
			createdAt: booking.createdAt
		})
	})

	if(!res.ok){
		throw new Error("Failed to create booking for" + booking.shop.id)
	}
	
	return await res.json()
}