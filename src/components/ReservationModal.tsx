'use client'
import React, { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox, Input, Link, useDisclosure, Radio, RadioGroup} from "@nextui-org/react";
import ReservationCard from "./ReservationCard";
import { useSession } from "next-auth/react";
import updateBooking from "@/libs/updateBooking";
import Reservation from "@/types/reservation";
import Reservations from "@/types/Reservations";
import deleteBooking from "@/libs/deleteBooking";

export default function ReservationModal({reservations}:{reservations:Reservations}) {
	
  const {data:session} = useSession();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [reservation, setReservation] = useState<Reservation>()
  const [date, setDate] = useState('not selected')
  const [serviceMinute, setServiceMinute] = useState(0)
  const servicehours = [60,90,120]

  function handleUpdate(){
    updateBooking(session?.user.token || "", {
      ...reservation,
      bookingDate: date,
      serviceMinute: serviceMinute,
      createdAt: new Date().toISOString().slice(0,10)
    })
  }

  function handleDelete(){
    deleteBooking(session?.user.token || "", reservation?._id || "")
  }
  
  return (
    <>
      <div className="w-full h-full mt-20">
			<h1 className='text-5xl font-bold text-center pt-5 pb-5'>My reservations</h1>
			{
				reservations.data.map((reservation, index) => (
					<ReservationCard key={index} reservation={reservation} setReservation={setReservation} onOpenModal={onOpen} />
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
              <ModalHeader className="flex flex-col gap-1">Reservation for {reservation?.shop.name}</ModalHeader>
              <ModalBody>
                <Input
                  label="Date"
                  placeholder="Enter your date"
                  type="date"
                  variant="bordered"
                  onChange={(e)=>setDate(e.target.value)}
                  required
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
                <Button color="danger" variant="flat" onPress={()=>{handleDelete(); onClose(); window.location.reload();}}>
                  Delete
                </Button>
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
