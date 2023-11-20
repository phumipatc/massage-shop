import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { useEffect } from "react";
export default function ModalNoBtn({children, modalTitle, isShow}:{children: React.ReactNode, modalTitle:string, isShow:boolean}){
    
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    useEffect(() => {
      if(isShow){
        onOpen()
      }
    }, [isShow])
    return (
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{modalTitle}</ModalHeader>
              <ModalBody>
                {children}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    )
}