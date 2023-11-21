'use client'
import React, { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox, Input, Link, useDisclosure, select, RadioGroup, Radio} from "@nextui-org/react";
import Shop from "@/types/shop";
import ShopCard from "./ShopCard";
import shops from "@/types/Shops";
import { useSession } from "next-auth/react";
import createBooking from "@/libs/createBooking";

export default function ShopModal({profile, shops, onSelectShopToEdit, onOpenEditModal}:{profile:Object, shops:shops, onSelectShopToEdit:Function, onOpenEditModal:Function}) {
  
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
  const servicehours = [60,90,120]
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
                <RadioGroup
                  label="Service"
                  value={serviceMinute.toString()}
                  onChange={(e)=>{setServiceMinute(Number(e.target.value))}}
                  orientation="horizontal"
                >
                  {servicehours.map((hour:number) => (
                    <Radio key={hour} value={hour.toString()}>{hour} minutes</Radio>
                  ))}
                </RadioGroup>
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
