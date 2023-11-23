'use client'
import React, { useRef, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Link, useDisclosure, RadioGroup, Radio } from "@nextui-org/react";
import Shop from "@/types/shop";
import ShopCard from "./ShopCard";
import Shops from "@/types/Shops";
import { useSession } from "next-auth/react";
import createBooking from "@/libs/createBooking";
import getBookings from "@/libs/getBookings";
import ModalNoBtn from "./ModalNoBtn";

export default function ShopModal({ profile, shops, onSelectShopToEdit, onOpenEditModal }: { profile: Object, shops: Shops, onSelectShopToEdit: Function, onOpenEditModal: Function }) {

    const { data: session } = useSession();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [shop, setShop] = useState<Shop>()
    const [date, setDate] = useState('not selected')
    const [serviceMinute, setServiceMinute] = useState(0)
    const servicehours = [60, 90, 120]
    const [isShow, setIsShow] = useState(false)
    const [isOk, setIsOk] = useState(0)
    const res = useRef(null)
    const message = [
        "An error has occured. Please recheck your information and try again.",
        "You have already booked 3 times. Please cancel one of your bookings to book again.",
        "Booking complete"
    ]
    function selectShopToBook(shop: Shop) {
        setShop(shop)
        setDate('not selected')
        setServiceMinute(0)
        setIsShow(false)
    }

    async function handleCreate() {
        const response = await createBooking(session?.user.token || "", {
            shop: shop,
            bookingDate: date,
            serviceMinute: serviceMinute,
            createdAt: new Date().toISOString().slice(0, 10)
        }).then((res) => {
            setIsOk(2)
            setIsShow(true)
        },(err) => {
            const bookings = getBookings(session?.user.token || "")
            bookings.then((res) => {
                if (res.data.length >= 3) {
                    setIsOk(1)
                    setIsShow(true)
                }
                else {
                    setIsOk(0)
                    setIsShow(true)
                }
            })
        })
    }
    return (
        <>
            <ModalNoBtn isShow={isShow} modalTitle={isOk==2? "Book complete": "Book error"}>
                <p>{message[isOk]}</p>
                {isOk==2?<Link href={`/reservations/`}>Click here to see your booking</Link>:null}
            </ModalNoBtn>
            {shops.data.map((shop: Shop) => (
                <ShopCard profile={profile} key={shop.id} shop={shop} onBooking={selectShopToBook} onOpenBookingModal={onOpen} onSelectShopToEdit={onSelectShopToEdit} onOpenEditModal={onOpenEditModal} />
            )
            )}
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Booking for {shop?.name}</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    label="Date"
                                    placeholder="Enter your date"
                                    type="date"
                                    variant="bordered"
                                    required
                                    onChange={(e) => { setDate(e.target.value) }}
                                />
                                <RadioGroup
                                    label="Service"
                                    value={serviceMinute.toString()}
                                    onChange={(e) => { setServiceMinute(Number(e.target.value)) }}
                                    orientation="horizontal"
                                >
                                    {servicehours.map((hour: number) => (
                                        <Radio key={hour} value={hour.toString()}>{hour} minutes</Radio>
                                    ))}
                                </RadioGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={() => { handleCreate(); onClose();}}>
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
