'use client'
import React, { useEffect, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, useDisclosure, Radio, RadioGroup} from "@nextui-org/react";
import ReservationCard from "./ReservationCard";
import { useSession } from "next-auth/react";
import updateBooking from "@/libs/updateBooking";
import Reservation from "@/types/reservation";
import Reservations from "@/types/Reservations";
import deleteBooking from "@/libs/deleteBooking";
import dayjs from "dayjs";

export default function ReservationModal({profile, reservations}:{profile:Object, reservations:Reservations}) {
	
  const {data:session} = useSession();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [reservation, setReservation] = useState<Reservation>()
  const [date, setDate] = useState('not selected')
  const [serviceMinute, setServiceMinute] = useState(0)
  const servicehours = [60,90,120]
  const [currentWantRole, setCurrentWantRole] = useState('admin')
  const [reservationsToShow, setReservationsToShow] = useState<Reservations>(reservations)

  function currentWantRoleHandler(){
    if(profile?.data.role == 'admin'){
      if(currentWantRole == 'user'){
        setCurrentWantRole('admin')
        reservationsToShow.data = reservations.data
        reservationsToShow.count = reservations.data.length
      }else{
        setCurrentWantRole('user')
        reservationsToShow.data = reservations.data.filter((reservation)=>reservation.user._id == profile.data._id)
        reservationsToShow.count = reservations.data.filter((reservation)=>reservation.user._id == profile.data._id).length
      }
    }else{
      setCurrentWantRole('user')
      reservationsToShow.data = reservations.data
      reservationsToShow.count = reservations.data.length
    }
  }

  function selectReservationToEdit(reservation:Reservation){
    setDate(reservation.bookingDate)
    setServiceMinute(reservation.serviceMinute)
    setReservation(reservation)
  }
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
        <div className="w-full flex justify-center">
          <Button className='h-fit text-5xl font-bold text-center pt-5 pb-5' onClick={currentWantRoleHandler}>{(currentWantRole == 'admin' && profile?.data.role == 'admin')?'All reservations':'My reservations'}</Button>
        </div>
        {
          reservationsToShow.data.map((reservation, index) => (
            <ReservationCard key={index} profile={profile} reservation={reservation} selectReservationToEdit={selectReservationToEdit} onOpenModal={onOpen} />
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
                  value={dayjs(date).format('YYYY-MM-DD')}
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
