import Reservation from "@/types/reservation";

export default async function updateBooking(token: string, booking:Reservation|any) {

    if(!booking._id || !booking.bookingDate || !booking.serviceMinute || !booking.createdAt){
        throw new Error("Missing input")
    }
	const res = await fetch('http://localhost:5000/api/v1/bookings/' + booking._id,{
		method: 'PUT',
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
	console.log(res)
	if(!res.ok){
		throw new Error("Failed to update booking for " + booking.shop.name)
	}

	return await res.json()
}