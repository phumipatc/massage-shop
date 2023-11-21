export default async function getShops() {

	const res = await fetch("http://localhost:5000/api/v1/shops")
	if(!res.ok){
		throw new Error("Failed to fetch shops")
	}
	return await res.json()
}