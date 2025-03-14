"use client";

import { useForm } from "react-hook-form";
import Label from "./Label";
import { Button, ListBox, ListBoxItem, Popover, Select, SelectStateContext, SelectValue } from "react-aria-components";
import { useContext, useEffect, useState } from "react";
import { getDepartments } from "@/services/generalServices";
import { Department } from "@/types/types";
import Image from "next/image";

type FormInputTypes = {
  name: string;
  lastname: string;
  department: string;
  avatar: File;
};

const CustomForm = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [fileName, setFileName] = useState<string>("");

  const state = useContext(SelectStateContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputTypes>();

  const onSubmit = (data: FormInputTypes) => {
    console.log(data);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const maxSizeInBytes = 600 * 1024; // 600KB in bytes
      if (file.size > maxSizeInBytes) {
        alert("ატვირთეთ 600KB-ზე ნაკლები ზომის ფოტო");
        input.value = ""; // Clear the file input
        setFileName("");
      } else {
        setFileName(file.name);
      }
    }
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getDepartments();
        console.log("Departments: ", data);
        setDepartments(data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  const selectedDepartment = watch("department");

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-[45px]">
      <div className="flex gap-[45px]">
        <div className="flex flex-1 flex-col gap-1">
          <Label title="სახელი" htmlFor="text" />
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            onChange={(e) => {
              e.target.value = e.target.value.replace(/[^a-zA-Z]/g, "");
            }}
            className="h-[42px] rounded-md border border-[#CED4DA] p-2.5"
          />
          {errors.name && <p className="absolute mt-[2px] text-xs text-red-500">{errors.name.message}</p>}
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <Label title="გვარი" htmlFor="lastname" />

          <input
            type="text"
            {...register("lastname", { required: "Name is required" })}
            onChange={(e) => {
              e.target.value = e.target.value.replace(/[^a-zA-Z]/g, "");
            }}
            className="h-[42px] rounded-md border border-[#CED4DA] p-2.5"
          />
          {errors.lastname && <p className="absolute mt-[2px] text-xs text-red-500">{errors.lastname.message}</p>}
        </div>
      </div>

      <div>
        <Label title="ავატარი" htmlFor="photo" />
        <div className="h-[120px] cursor-pointer rounded-lg border border-dashed border-[#CED4DA]">
          <input
            type="file"
            id="photo"
            {...register("avatar", {
              required: "სურათის ატვირთვა აუცილებელია",
              onChange: handleFileChange,
            })}
          />
        </div>
      </div>

      <div className="flex w-1/2 flex-col gap-1">
        <Label title="დეპარტამენტი" htmlFor="department" />
        <Select id="department" selectedKey={selectedDepartment}>
          <Button
            className={`flex w-full cursor-pointer items-center justify-between border border-[#CED4DA] p-3 text-left ${state?.isOpen ? "rounded-b-none border-b-0" : "rounded-md"}`}
          >
            <SelectValue />
            <span aria-hidden="true">
              <Image src="/svgs/formArrow.svg" alt="arrow" width={14} height={14} />
            </span>
          </Button>
          <Popover
            className="top-6 m-0 w-[406.5px] rounded-md rounded-t-none border border-t-0 border-[#CED4DA] bg-white p-3 pb-1.5"
            placement="bottom start"
            offset={-6}
          >
            <ListBox>
              {departments.map((dept) => (
                <ListBoxItem key={dept.id} className="h-[42px] cursor-pointer hover:scale-[101%]">
                  {dept.name}
                </ListBoxItem>
              ))}
            </ListBox>
          </Popover>
        </Select>
      </div>
    </form>
  );
};

export default CustomForm;
