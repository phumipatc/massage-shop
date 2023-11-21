'use client'
import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, useDisclosure, RadioGroup, Radio } from "@nextui-org/react";
import Shop from "@/types/shop";
import Shops from "@/types/Shops";
import ShopModal from "./ShopModal";
import updateShop from "@/libs/updateShop";
import { useSession } from "next-auth/react";
import deleteShop from "@/libs/deleteShop";
import createShop from "@/libs/createShop";

export default function ShopListContainer({ profile, shops }: { profile: Object, shops: Shops }) {
	const { data: session } = useSession()

	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [shopId, setShopId] = useState('not selected')
	const [shopName, setShopName] = useState('not selected')
	const [shopAddress, setShopAddress] = useState('not selected')
	const [shopProvince, setShopProvince] = useState('not selected')
	const [shopPostalcode, setShopPostalcode] = useState('not selected')
	const [shopPriceLevel, setShopPriceLevel] = useState(0)
	const [shopPicture, setShopPicture] = useState('not selected')
	const [shopTel, setShopTel] = useState('not selected')
	const [functionType, setFunctionType] = useState('not selected')
	const pricelevel = [1, 2, 3]
	
	function selectShopToEdit(shop: Shop) {
		setFunctionType('update')
		setShopId(shop.id)
		setShopName(shop.name)
		setShopAddress(shop.address)
		setShopProvince(shop.province)
		setShopPostalcode(shop.postalcode)
		setShopPriceLevel(shop.priceLevel)
		setShopPicture(shop.picture)
		setShopTel(shop.tel)
	}

	function clearShop() {
		setShopId('')
		setShopName('')
		setShopAddress('')
		setShopProvince('')
		setShopPostalcode('')
		setShopPriceLevel(0)
		setShopPicture('')
		setShopTel('')
	}

	function handleCreate() {
		createShop(session?.user.token || "", {
			name: shopName,
			address: shopAddress,
			province: shopProvince,
			postalcode: shopPostalcode,
			priceLevel: shopPriceLevel,
			tel: shopTel,
			picture: shopPicture
		})
	}
	function handleUpdate() {
		updateShop(session?.user.token || "", {
			id: shopId,
			name: shopName,
			address: shopAddress,
			province: shopProvince,
			postalcode: shopPostalcode,
			priceLevel: shopPriceLevel,
			tel: shopTel,
			picture: shopPicture
		})
	}

	function handleDelete() {
		deleteShop(session?.user.token || "", shopId)
	}

	return (
		<>
			{profile?.data.role == 'admin' ? 
				<div className="flex w-full justify-center">
					<Button color="primary" onClick={()=>{onOpen();setFunctionType('create');clearShop()}}>Add more shop</Button>
				</div> : null
			}
			<ShopModal profile={profile} shops={shops} onSelectShopToEdit={selectShopToEdit} onOpenEditModal={onOpen} />
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				placement="top-center"
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">{
								(functionType == 'update')? 'Edit shop' : 'Add shop'
							}</ModalHeader>
							<ModalBody>
								<Input
									autoFocus
									label="Shop Name"
									placeholder="Enter your shop name"
									value={shopName}
									variant="bordered"
									onChange={(e) => setShopName(e.target.value)}
									required
								/>
								<Input
									label="Address"
									placeholder="Enter your address"
									value={shopAddress}
									variant="bordered"
									onChange={(e) => setShopAddress(e.target.value)}
									required
								/>
								<Input
									label="Province"
									placeholder="Enter your province"
									value={shopProvince}
									variant="bordered"
									onChange={(e) => setShopProvince(e.target.value)}
									required
								/>
								<Input
									label="Postal code"
									placeholder="Enter your postal code"
									value={shopPostalcode}
									variant="bordered"
									onChange={(e) => setShopPostalcode(e.target.value)}
									required
								/>
								<Input
									label="Telephone number"
									placeholder="Enter your telephone number"
									value={shopTel}
									variant="bordered"
									onChange={(e) => setShopTel(e.target.value)}
									required
								/>
								<Input
									label="Picture link"
									placeholder="Enter your picture link"
									value={shopPicture}
									variant="bordered"
									onChange={(e) => setShopPicture(e.target.value)}
									required
								/>
								<RadioGroup
								label="Price level"
								value={shopPriceLevel.toString()}
								onChange={(e)=>{setShopPriceLevel(parseInt(e.target.value))}}
								orientation="horizontal"
								className="flex flex-row gap-x-5"
								>
								{pricelevel.map((level:number) => (
									<Radio key={level} value={level.toString()}>{level}</Radio>
								))}
								</RadioGroup>
							</ModalBody>
							<ModalFooter>
								{(functionType == 'update')?
									<>
										<Button color="danger" variant="flat" onPress={() => { handleDelete(); onClose(); window.location.reload(); }}>
											Delete
										</Button>
										<Button color="primary" onPress={() => { handleUpdate(); onClose(); window.location.reload(); }}>
											Update
										</Button>
									</>
									:
									<>
										<Button color="danger" variant="flat" onPress={onClose}>
											Close
										</Button>
										<Button color="primary" onPress={() => { handleCreate(); onClose(); window.location.reload();}}>
											Add
										</Button>
									</>
								}
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
