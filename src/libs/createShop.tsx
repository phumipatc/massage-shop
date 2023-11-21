import Shop from "@/types/shop"

export default async function createShop(token: string, shop:Shop|any) {
	if(!shop.name || !shop.address || !shop.province || !shop.postalcode || !shop.priceLevel || !shop.picture || !shop.tel){
        throw new Error("Missing input")
    }
	const res = await fetch('http://localhost:5000/api/v1/shops/',{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			name: shop.name,
            address: shop.address,
            priceLevel: shop.priceLevel,
            province: shop.province,
            postalcode: shop.postalcode,
            tel: shop.tel,
            picture: shop.picture
		})
	})
	if(!res.ok){
		throw new Error("Failed to create shop for " + shop.name)
	}

	return await res.json()
}