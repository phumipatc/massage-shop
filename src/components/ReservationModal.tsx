'use client'
import React, { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox, Input, Link, useDisclosure} from "@nextui-org/react";
import ReservationCard from "./ReservationCard";

export default function ReservationModal() {
	const mockReservations = [
		{
			id: '1',
			name: "BossYOYO's Massage Shop",
			date: "12-10-2023 12:00",
			duration: 30,
			phone: '0812345678',
			picture: "/img/mock_reservation_1.png"
		},
		{
			id: '2',
			name: "Rayong Massage Parlor",
			date: "12-10-2023 12:00",
			duration: 60,
			phone: '0812345678',
			picture: "/img/mock_reservation_1.png"
		},
		{
			id: '3',
			name: "Top Massage",
			date: "12-10-2023 12:00",
			duration: 90,
			phone: '0812345678',
			picture: "/img/mock_reservation_1.png"
		}
	]
  
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [reservationId, setReservationId] = useState('not selected')

  return (
    <>
      <div className="w-full h-full mt-20">
			<h1 className='text-5xl font-bold text-center pt-5 pb-5'>My reservations</h1>
			{
				mockReservations.map((reservation, index) => (
					<ReservationCard key={index} reservation={reservation} setReservationId={setReservationId} onOpenModal={onOpen} />
				))
			}
		</div>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Reservation for {reservationId}</ModalHeader>
              <ModalBody>
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
