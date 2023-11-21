export default async function deleteBooking(token:string, bookingId:string) {
	const res = await fetch('http://localhost:5000/api/v1/bookings/'+bookingId, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			authorization: `Bearer ${token}`,
		}
	})

	if(!res.ok){
		throw new Error("Failed to delete shop " + bookingId)
	}

	return await res.json()
}