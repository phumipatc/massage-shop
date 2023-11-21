'use client'
import React, { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox, Input, Link, useDisclosure, select} from "@nextui-org/react";
import Shop from "@/types/shop";
import Shops from "@/types/Shops";
import ShopModal from "./ShopModal";
import updateShop from "@/libs/updateShop";
import { useSession } from "next-auth/react";
import deleteShop from "@/libs/deleteShop";

export default function ShopListContainer({profile, shops}:{profile:Object, shops:Shops}) {
  const { data: session } = useSession()

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [shopId, setShopId] = useState('not selected')
  const [shopName, setShopName] = useState('not selected')
  const [shopAddress, setShopAddress] = useState('not selected')
  const [shopProvince, setShopProvince] = useState('not selected')
  const [shopPostalcode, setShopPostalcode] = useState('not selected')
  const [shopPriceLevel, setShopPriceLevel] = useState(0)
  const [shopPicture, setShopPicture] = useState('not selected')

  function selectShopToEdit(shop:Shop) {
    setShopId(shop.id)
    setShopName(shop.name)
	setShopAddress(shop.address)
	setShopProvince(shop.province)
	setShopPostalcode(shop.postalcode)
	setShopPriceLevel(shop.priceLevel)
	setShopPicture(shop.picture)
  }

  function handleUpdate() {
	updateShop(session?.user.token || "", {
		id: shopId,
		name: shopName,
		address: shopAddress,
		province: shopProvince,
		postalcode: shopPostalcode,
		priceLevel: shopPriceLevel,
		picture: shopPicture
	})
  }

  function handleDelete() {
	deleteShop(session?.user.token || "", shopId)
  }

  return (
    <>
      <ShopModal profile={profile} shops={shops} onSelectShopToEdit={selectShopToEdit} onOpenEditModal={onOpen}/>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Booking for {shopName}</ModalHeader>
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
				  label="Price level"
				  type="number"
				  placeholder="Enter your price level"
				  value={shopPriceLevel.toString()}
				  variant="bordered"
				  onChange={(e) => setShopPriceLevel(parseInt(e.target.value))}
				  required
				/>
				<Input
				  label="Picture"
				  placeholder="Enter your picture"
				  value={shopPicture}
				  variant="bordered"
				  onChange={(e) => setShopPicture(e.target.value)}
				  required
				/>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={()=>{handleDelete(); onClose(); window.location.reload();}}>
                  Delete
                </Button>
				{/* reload windows */}
                <Button color="primary" onPress={()=>{handleUpdate(); onClose(); window.location.reload();}}>
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
