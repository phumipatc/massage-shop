'use client'

import { Suspense, useEffect, useState } from "react"
import { LinearProgress } from "@mui/material"
import ShopListContainer from "./ShopListContainer"
import Shops from "@/types/Shops"
import { Radio, RadioGroup } from "@nextui-org/react"

export default function ShopList({profile, shops}: {profile: Object, shops: Shops}) {

	// store the shop name input
	const [searchShopName, setSearchShopName] = useState('')
	const [filteredShop, setFilteredShop] = useState(shops)
	const [searchPriceLevel, setSearchPriceLevel] = useState(0)
	const pricelevel = [0, 1, 2, 3]

	function searchHandler() {
		console.log(searchShopName, searchPriceLevel)
		if(searchShopName == '' && searchPriceLevel == 0){
			setFilteredShop(shops)
			return
		}
		if(searchShopName == ''){
			setFilteredShop({
				success: true,
				count: shops.data.filter((shop)=>shop.priceLevel == searchPriceLevel).length,
				data: shops.data.filter((shop)=>shop.priceLevel == searchPriceLevel)
			})
			return
		}
		if(searchPriceLevel == 0){
			setFilteredShop({
				success: true,
				count: shops.data.filter((shop)=>shop.name.toLowerCase().includes(searchShopName.toLowerCase())).length,
				data: shops.data.filter((shop)=>shop.name.toLowerCase().includes(searchShopName.toLowerCase()))
			})
			return
		}
		setFilteredShop({
			success: true,
			count: shops.data.filter((shop)=>shop.name.toLowerCase().includes(searchShopName.toLowerCase()) && shop.priceLevel == searchPriceLevel).length,
			data: shops.data.filter((shop)=>shop.name.toLowerCase().includes(searchShopName.toLowerCase()) && shop.priceLevel == searchPriceLevel)
		})
	}

	return (
		<div>
			<div className='m-5 mt-8 px-5 flex'>
				<div className='flex gap-3 w-11/12 justify-center'>
					<input className='border-2 border-gray-300 rounded-md px-2 w-8/12' value={searchShopName} type='text' placeholder='Shop Name' onChange={(e) => setSearchShopName(e.target.value)} />
					{/* <button className='border-2 border-gray-300 rounded-md px-2'>Province</button> */}
					{/* <button className='border-2 border-gray-300 rounded-md px-2'>Price level</button> */}
					<RadioGroup
						label="Price level"
						value={searchPriceLevel.toString()}
						onChange={(e)=>{setSearchPriceLevel(parseInt(e.target.value))}}
						orientation="horizontal"
						className="flex flex-row justify-center gap-x-5 py-4 border-2 border-gray-300 rounded-md px-2 w-4/12"
						>
						{pricelevel.map((level:number) => (
							<Radio key={level} value={level.toString()}>{level==0?'Any':level}</Radio>
						))}
					</RadioGroup>
					<button className='text-2xl font-semibold border-2 border-gray-300 rounded-md p-2 px-4' onClick={searchHandler}>Search</button>
				</div>
			</div>
			<div className='flex flex-col gap-3 md:gap-6 m-5 mt-10 w-full items-center'>
				<Suspense fallback={<p>Loading...<LinearProgress /></p>}>
					<ShopListContainer profile={profile} shops={filteredShop} />
					{filteredShop.count == 0 ? <p className='text-2xl font-semibold'>No shop found</p> : null}
				</Suspense>
			</div>
		</div>
	)
}