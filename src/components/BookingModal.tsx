'use client'
import React, { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox, Input, Link, useDisclosure, select} from "@nextui-org/react";
import Shop from "@/types/shop";
import ShopCard from "./ShopCard";
import shops from "@/types/shops";
import { useSession } from "next-auth/react";
import createBooking from "@/libs/createBooking";

export default function BookingModal({profile, shops, onSelectShopToEdit, onOpenEditModal}:{profile:Object, shops:shops, onSelectShopToEdit:Function, onOpenEditModal:Function}) {
  // 	const mockShop = [
	// 	{
	// 	  id: '1',
	// 	  name: "BossYOYO's Massage Shop",
	// 	  address: "temp",
	// 	  priceLevel: 3,
	// 	  province: 'Bangkok',
	// 	  postalcode: '13100',
	// 	  picture: '/img/mock_shop1.jpg'
	// 	},
	// 	{
	// 	  id: '2',
	// 	  name: "Rayong Massage Parlor",
	// 	  address: "temp",
	// 	  priceLevel: 2,
	// 	  province: 'Rayong',
	// 	  postalcode: '21000',
	// 	  picture: '/img/mock_shop2.jpg'
	// 	},
	// 	{
	// 	  id: '3',
	// 	  name: "Top Massage",
	// 	  address: "temp",
	// 	  priceLevel: 1,
	// 	  province: 'Bangkok',
	// 	  postalcode: '13100',
	// 	  picture: 'https://drive.google.com/uc?id=1PXXde6Rl7RVZMHP0BYit95hPIRhcKPvT'
	// 	}
	// ]

  const {data:session} = useSession();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [shopId, setShopId] = useState('not selected')
  const [shopName, setShopName] = useState('not selected')
  const [date, setDate] = useState('not selected')
  const [serviceMinute, setServiceMinute] = useState(0)

  function selectShopToBook(shop:Shop) {
    setShopId(shop.id)
    setShopName(shop.name)
  }

  function handleCreate(){
    createBooking(session?.user.token || "", {
      shopId: shopId,
      date: date,
      duration: serviceMinute,
      createdAt: new Date().toISOString().slice(0,10),
      id: 'not selected',
      name: 'not selected',
      phone: 'not selected',
      picture: 'not selected',
    })
  }

  return (
    <>
      {shops.data.map((shop:Shop) => (
			  <ShopCard profile={profile} key={shop.id} shop={shop} onBooking={selectShopToBook} onOpenBookingModal={onOpen} onSelectShopToEdit={onSelectShopToEdit} onOpenEditModal={onOpenEditModal}/>
		  ))}
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
                  label="Date"
                  placeholder="Enter your date"
                  type="date"
                  variant="bordered"
                  required
                  onChange={(e)=>{setDate(e.target.value)}}
                />
                <Input
                  label="Service Minutes"
                  placeholder="Enter your service minutes"
                  type="number"
                  variant="bordered"
                  required
                  onChange={(e)=>{setServiceMinute(parseInt(e.target.value))}}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={()=>{handleCreate(); onClose();}}>
                  Book
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
