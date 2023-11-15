'use client'
import React, { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox, Input, Link, useDisclosure} from "@nextui-org/react";
import registerUser from "@/libs/registerUser";

export default function SignupModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [name, setName] = useState("not set")
  const [email, setEmail] = useState("not set")
  const [tel, setTel] = useState("not set")
  const [password, setPassword] = useState("not set")

  function sendRegistration(name: string, email: string, tel: string, password: string) {
    registerUser({
      name: name,
      email: email,
      tel: tel,
      role: "user",
      password: password,
      createdAt: new Date().toISOString().slice(0, 10),
    })
	}

  return (
    <>
      <Button onPress={onOpen} className='bg-[#C76B98] text-white px-5 leading-10 rounded-xl'>Sign up</Button>
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
                />
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                  onValueChange={(value) => setEmail(value)}
                />
                <Input
                  label="Telephone number"
                  placeholder="Enter your number"
                  variant="bordered"
                  onValueChange={(value) => setTel(value)}
                />
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                  onValueChange={(value) => setPassword(value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={()=>{sendRegistration(name, email, tel, password); onClose()}}>
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
