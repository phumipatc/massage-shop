export default async function getBookings(token:string) {

	const res = await fetch("http://localhost:5000/api/v1/bookings", {
		method: 'GET',
		headers: {
			authorization: `Bearer ${token}`,
		},
	})
	if(!res.ok){
		throw new Error("Failed to fetch bookings")
	}
	return await res.json()
}