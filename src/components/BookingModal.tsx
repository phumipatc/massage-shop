'use client'
import React, { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox, Input, Link, useDisclosure} from "@nextui-org/react";
import ShopCard from "./ShopCard";

export default function BookingModal() {
  const mockShop = [
    {
      id: '1',
      name: "BossYOYO's Massage Shop",
      address: "temp",
      priceLevel: 3,
      province: 'Bangkok',
      postalcode: '13100',
      picture: '/img/mock_shop1.jpg'
    },
    {
      id: '2',
      name: "Rayong Massage Parlor",
      address: "temp",
      priceLevel: 2,
      province: 'Rayong',
      postalcode: '21000',
      picture: '/img/mock_shop2.jpg'
    },
    {
      id: '3',
      name: "Top Massage",
      address: "temp",
      priceLevel: 1,
      province: 'Bangkok',
      postalcode: '13100',
      picture: '/img/mock_shop3.jpg'
    }
  ]
  
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [shopId, setShopId] = useState('not selected')

  return (
    <>
      <div className='flex flex-col gap-3 md:gap-6 m-5 mt-8 w-full items-center'>
          {mockShop.map((shop,index) => (
            <ShopCard key={index} shop={shop} onBooking={setShopId} onOpenModal={onOpen}/>
          ))}
        </div>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Booking for {shopId}</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                />
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                />
                <Input
                  label="Date"
                  placeholder="Enter your date"
                  type="date"
                  variant="bordered"
                />
                <Input
                  label="Service Minutes"
                  placeholder="Enter your service minutes"
                  type="number"
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Sign up
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
