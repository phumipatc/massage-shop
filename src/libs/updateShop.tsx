import Shop from "@/types/shop"

export default async function updateShop(token:string, shop:Shop) {
	const res = await fetch('http://localhost:5000/api/v1/shops/'+shop.id, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			name: shop.name,
			address: shop.address,
			province: shop.province,
			postalcode: shop.postalcode,
			priceLevel: shop.priceLevel,
			picture: shop.picture
		})
	})

	if(!res.ok){
		throw new Error("Failed to update shop " + shop.id)
	}

	return await res.json()
}