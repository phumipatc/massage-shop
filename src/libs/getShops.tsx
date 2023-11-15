export default async function getShops() {

	await new Promise(resolve => setTimeout(resolve, 2000))

	const res = await fetch("http://localhost:5000/api/v1/shops")
	if(!res.ok){
		throw new Error("Failed to fetch shops")
	}
	return await res.json()
}