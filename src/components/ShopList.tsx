'use client'

import { Suspense, useEffect, useState } from "react"
import { LinearProgress } from "@mui/material"
import ShopListContainer from "./ShopListContainer"
import Shops from "@/types/Shops"
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Radio, RadioGroup } from "@nextui-org/react"

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
				<div className='flex gap-3 w-full justify-center flex-col lg:flex-row'>
					<Dropdown>
						<DropdownTrigger>
							<Button 
							variant="bordered" 
							className="lg:w-1/5 h-10 lg:h-14 w-full"
							>
							Price level: {searchPriceLevel==0?'Any':searchPriceLevel}
							</Button>
						</DropdownTrigger>
						<DropdownMenu aria-label="Static Actions" onAction={(key)=>{setSearchPriceLevel(key)}}>
							{pricelevel.map((level:number) => (
								<DropdownItem key={level}>{level==0?'Any':level}</DropdownItem>
							))}
						</DropdownMenu>
					</Dropdown>
					<input className='border-2 border-gray-300 rounded-md px-2 grow h-10 lg:h-14' value={searchShopName} type='text' placeholder='Shop Name' onChange={(e) => setSearchShopName(e.target.value)} />
					{/* <button className='border-2 border-gray-300 rounded-md px-2'>Province</button> */}
					{/* <button className='border-2 border-gray-300 rounded-md px-2'>Price level</button> */}
					<button className='text-base lg:text-2xl font-semibold border-2 border-gray-300 rounded-md p-2 px-4 h-10 lg:h-14' onClick={searchHandler}>Search</button>
				</div>
			</div>
			<div className='flex flex-col gap-3 lg:gap-6 mt-5 lg:mt-10 w-full items-center'>
				<Suspense fallback={<p>Loading...<LinearProgress /></p>}>
					<ShopListContainer profile={profile} shops={filteredShop} />
					{filteredShop.count == 0 ? <p className='text-2xl font-semibold'>No shop found</p> : null}
				</Suspense>
			</div>
		</div>
	)
}