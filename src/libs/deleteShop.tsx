export default async function deleteShop(token:string, shopId:string) {
	const res = await fetch('http://localhost:5000/api/v1/shops/'+shopId, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			authorization: `Bearer ${token}`,
		}
	})

	if(!res.ok){
		throw new Error("Failed to delete shop " + shopId)
	}

	return await res.json()
}