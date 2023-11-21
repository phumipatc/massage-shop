'use client'

import { Suspense, useEffect, useState } from "react"
import { LinearProgress } from "@mui/material"
import ShopModal from "./ShopListContainer"
import Shops from "@/types/Shops"

export default function ShopList({profile, shops}: {profile: Object, shops: Shops}) {

	// store the shop name input
	const [searchShopName, setSearchShopName] = useState('')
	const [filteredShop, setFilteredShop] = useState(shops)

	function searchHandler() {
		if(searchShopName != ''){
			console.log(searchShopName)
			console.log(shops.data.filter(shop => shop.name.toLowerCase().includes(searchShopName.toLowerCase())))
			setFilteredShop({
				success: true,
				count: shops.data.filter(shop => {shop.name.toLowerCase().includes(searchShopName.toLowerCase())}).length,
				data: shops.data.filter(shop => {shop.name.toLowerCase().includes(searchShopName.toLowerCase())})
			})
		}else{
			setFilteredShop(shops)
		}
	}

	return (
		<div>
			<div className='m-5 mt-8 px-5 flex'>
				<div className='flex gap-3 w-11/12'>
					<input className='border-2 border-gray-300 rounded-md px-2 w-7/12' value={searchShopName} type='text' placeholder='Shop Name' onChange={(e) => setSearchShopName(e.target.value)} />
					{/* <button className='border-2 border-gray-300 rounded-md px-2'>Province</button> */}
					<button className='border-2 border-gray-300 rounded-md px-2'>Price level</button>
				</div>
				<button className='text-2xl font-semibold border-2 border-gray-300 rounded-md p-2 px-4' onClick={searchHandler}>Search</button>
			</div>
			<div className='flex flex-col gap-3 md:gap-6 m-5 mt-10 w-full items-center'>
				<Suspense fallback={<p>Loading...<LinearProgress /></p>}>
					<ShopModal profile={profile} shops={filteredShop} />
					{filteredShop.count == 0 ? <p className='text-2xl font-semibold'>No shop found</p> : null}
				</Suspense>
			</div>
		</div>
	)
}