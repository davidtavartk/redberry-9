"use client";

import React from "react";
import { Dialog, Heading, Modal, ModalOverlay } from "react-aria-components";
import CustomForm from "../CustomForm/CustomForm";
import Image from "next/image";

const EmployeeModal = () => {

  return (
    <ModalOverlay className="fixed inset-0 flex items-center justify-center bg-[#0D0F10]/[0.15] backdrop-blur-[10px]" isDismissable>
      <Modal
        className="m-auto h-[900px] w-[913px] rounded-[10px] bg-white fixed top-0 inset-0 outline-none"
      >
        <Dialog className="flex flex-col pt-10 pb-[60px] px-[50px] gap-[37px]">
            <div className="self-end">
                <button onClick={() => console.log("close")} className="">
                    <Image src="/svgs/close.svg" alt="close" width={40} height={40}/>
                </button>
            </div>
          <Heading slot="title" className="text-c-grey text-center font-medium text-[32px]">
            თანამშრომლის დამატება
          </Heading>
          <CustomForm />
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
};

export default EmployeeModal;
