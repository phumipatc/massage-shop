'use client'
import React, { useRef, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, useDisclosure} from "@nextui-org/react";
import registerUser from "@/libs/registerUser";
import ModalNoBtn from "@/components/ModalNoBtn";

export default function SignupModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [name, setName] = useState("not set")
  const [email, setEmail] = useState("not set")
  const [tel, setTel] = useState("not set")
  const [password, setPassword] = useState("not set")
  const [isShow, setIsShow] = useState(false)
  const [isOk, setIsOk] = useState(false)
  const res = useRef(null)
  async function sendRegistration(name: string, email: string, tel: string, password: string) {
    const response = await registerUser({
      name: name,
      email: email,
      tel: tel,
      role: "user",
      password: password,
      createdAt: new Date().toISOString().slice(0, 10),
    })
    if(response.success){
      setIsOk(true)
    }
    else{
      setIsOk(false)
    }
    res.current = response
	}
  return (
    <>
      <ModalNoBtn isShow={isShow} modalTitle={isOk? "Sign up complete": "Sign up error"}>
        {isOk?
          `Sign up complete. User ${res.current?.name??'null'} is registered. Please login.`
          : "An error has occured. Please recheck your information and try again."
        }
      </ModalNoBtn>
      <Button onPress={onOpen} onClick={()=>{setIsShow(false)}} className='bg-[#C76B98] text-white px-5 leading-10 rounded-xl'>Sign up</Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Sign Up</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Name"
                  placeholder="Enter your name"
                  variant="bordered"
                  onValueChange={(value) => setName(value)}
                  required
                />
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                  onValueChange={(value) => setEmail(value)}
                  required
                />
                <Input
                  label="Telephone number"
                  placeholder="Enter your number"
                  variant="bordered"
                  onValueChange={(value) => setTel(value)}
                  required
                />
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                  onValueChange={(value) => setPassword(value)}
                  required
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={()=>{sendRegistration(name, email, tel, password); onClose(); setIsShow(true)}}>
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
