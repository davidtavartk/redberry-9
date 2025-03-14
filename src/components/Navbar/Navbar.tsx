"use client";

import Image from "next/image";
// import  { useState } from "react";
import CustomButton from "../UI/Button/CustomButton";
import EmployeeModal from "../EmployeeModal/EmployeeModal";
import {  DialogTrigger } from "react-aria-components";

const Navbar = () => {

  return (
    <nav className="h-[100px]">
      <div className="mx-auto flex h-full items-center justify-between px-[120px]">
        <div className="cursor-pointer">
          <Image src="/svgs/logo.svg" alt="logo" width={210} height={38} priority />
        </div>

        <div className="flex items-center gap-10">
          <DialogTrigger>
            <CustomButton>თანამშრომლის შექმნა</CustomButton>
            <EmployeeModal/>
          </DialogTrigger>

          <CustomButton filled>
            <Image src="/svgs/plus.svg" alt="logo" width={20} height={20} />
            შექმენი ახალი დავალება
          </CustomButton>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
