"use client";

import { useForm } from "react-hook-form";
import Label from "./Label";
import { useEffect, useState } from "react";
import Image from "next/image";
import CircleAvatar from "./CircleAvatar";
import CustomButton from "../UI/Button/CustomButton";
import CheckIcon from "../../../public/svgs/svgComponent/CheckIcon";
import { CustomFormProps } from "@/types/propTypes";
import { getDepartments } from "@/services/generalServices";
import { Department, EmployeeFormInputTypes } from "@/types/types";
import EntityDropdown from "./EntityDropdown";



const CustomForm = ({ close }: CustomFormProps) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [departments, setDepartments] = useState<Department[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    resetField,
    formState: { errors, isSubmitted },
  } = useForm<EmployeeFormInputTypes>({});

  const nameValue = watch("name", "");
  const surnameValue = watch("surname", "");
  const selectedDepartment = watch("department");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.size > 1024 * 1024) {
        alert("ატვირთეთ 1MB-ზე ნაკლები ზომის ფოტო");
        e.target.value = "";
        setFileName(null);
        setPreview(null);
        trigger("avatar");
      } else {
        setFileName(file.name);
        setPreview(URL.createObjectURL(file));
        trigger("avatar");
      }
    }
  };

  const removeImage = () => {
    setFileName(null);
    setPreview(null);
    resetField("avatar");
  };

  const onSubmit = async (data: EmployeeFormInputTypes) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("surname", data.surname);
      if (data.avatar) {
        formData.append("avatar", data.avatar);
      }
      formData.append("department_id", data.department);

      console.log(data);

      // const response = await createEmployee(formData);
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getDepartments();
        setDepartments(data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  useEffect(() => {
    trigger("avatar");
  }, [trigger]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex h-full flex-col justify-between">
      <div className="flex h-full flex-col gap-[45px]">
        <div className="flex gap-[45px]">
          {/* Name */}
          <div className="flex flex-1 flex-col gap-1">
            <Label title="სახელი" htmlFor="text" />
            <input
              type="text"
              id="name"
              {...register("name", {
                required: "Name is required",
                minLength: { value: 2, message: "მინიმუმ 2 სიმბოლო" },
                maxLength: { value: 255, message: "მაქსიმუმ 255 სიმბოლო" },
              })}
              onInput={(e) => {
                const sanitizedValue = e.currentTarget.value.replace(/[^a-zA-Zა-ჰ]/g, "");
                setValue("name", sanitizedValue, { shouldValidate: true });
                trigger("name");
              }}
              className="h-[42px] rounded-md border border-[#CED4DA] p-2.5"
            />
            <div className="flex flex-col gap-1 text-[10px]">
              <span
                className={`flex items-center gap-1 ${
                  nameValue.length >= 2 ? "text-green-500" : nameValue.length > 0 ? "text-red-400" : "text-[#6C757D]"
                }`}
              >
                <CheckIcon
                  fill={nameValue.length >= 2 ? "#00C951" : nameValue.length > 0 ? "red" : "#6C757D"}
                  width="16"
                  height="16"
                />
                <p>მინიმუმ 2 სიმბოლო</p>
              </span>

              <span
                className={`flex items-center gap-1 ${
                  nameValue.length > 255
                    ? "text-red-400"
                    : nameValue.length >= 2
                      ? "text-green-500"
                      : nameValue.length > 0
                        ? "text-red-400"
                        : "text-[#6C757D]"
                }`}
              >
                <CheckIcon
                  fill={
                    nameValue.length > 255 ? "red" : nameValue.length >= 2 ? "#00C951" : nameValue.length > 0 ? "red" : "#6C757D"
                  }
                  width="16"
                  height="16"
                />
                <p>მაქსიმუმ 255 სიმბოლო</p>
              </span>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-1">
            <Label title="გვარი" htmlFor="surname" />

            <input
              type="text"
              id="surname"
              {...register("surname", {
                required: "Name is required",
                minLength: { value: 2, message: "მინიმუმ 2 სიმბოლო" },
                maxLength: { value: 255, message: "მაქსიმუმ 255 სიმბოლო" },
              })}
              onInput={(e) => {
                const sanitizedValue = e.currentTarget.value.replace(/[^a-zA-Zა-ჰ]/g, "");
                setValue("surname", sanitizedValue, { shouldValidate: true });
                trigger("surname");
              }}
              className="h-[42px] rounded-md border border-[#CED4DA] p-2.5"
            />
            <div className="flex flex-col gap-1 text-[10px]">
              <span
                className={`flex items-center gap-1 ${
                  surnameValue.length >= 2 ? "text-green-500" : surnameValue.length > 0 ? "text-red-400" : "text-[#6C757D]"
                }`}
              >
                <CheckIcon
                  fill={surnameValue.length >= 2 ? "#00C951" : surnameValue.length > 0 ? "red" : "#6C757D"}
                  width="16"
                  height="16"
                />
                <p>მინიმუმ 2 სიმბოლო</p>
              </span>

              {/* ✅ Maximum Length Validation */}
              <span
                className={`flex items-center gap-1 ${
                  surnameValue.length > 255
                    ? "text-red-400"
                    : surnameValue.length >= 2
                      ? "text-green-500"
                      : surnameValue.length > 0
                        ? "text-red-400"
                        : "text-[#6C757D]"
                }`}
              >
                <CheckIcon
                  fill={
                    surnameValue.length > 255
                      ? "red"
                      : surnameValue.length >= 2
                        ? "#00C951"
                        : surnameValue.length > 0
                          ? "red"
                          : "#6C757D"
                  }
                  width="16"
                  height="16"
                />
                <p>მაქსიმუმ 255 სიმბოლო</p>
              </span>
            </div>
          </div>
        </div>

        {/* Avatar Upload */}
        <div>
          <Label title="ავატარი" htmlFor="photo" />
          <div className="flex h-[120px] flex-col items-center justify-center rounded-lg border border-dashed border-[#CED4DA]">
            {preview ? (
              <CircleAvatar photoSrc={preview} onRemove={removeImage} />
            ) : (
              <label htmlFor="photo" className="cursor-pointer">
                <Image src="/svgs/uploadPhoto.svg" alt="upload" width={136} height={50} />
              </label>
            )}
            <input
              type="file"
              id="photo"
              accept="image/*"
              // className="hidden"
              {...register("avatar", {
                required: "სურათის ატვირთვა აუცილებელია",
                validate: {
                  isImage: (file) => {
                    if (!file) return "სურათის ატვირთვა აუცილებელია";
                    if (file instanceof File) {
                      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
                      return validTypes.includes(file.type) || "The avatar field must be an image.";
                    }
                    return "Invalid file format";
                  },
                },
              })}
              onChange={handleFileChange}
            />
          </div>
          {fileName && <p>ჩატვირთული ფოტო: {fileName}</p>}
          {isSubmitted && errors.avatar && <p className="text-xs text-red-500">{errors.avatar.message}</p>}
        </div>

        {/* Department */}
        <div className="flex w-1/2 flex-col gap-1">
          <Label title="დეპარტამენტი" htmlFor="department" />
          <EntityDropdown
            name="department"
            entities={departments}
            selectedEntity={selectedDepartment}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setValue={setValue}
          />
        </div>
      </div>

      <div className="flex gap-[15px] self-end">
        <CustomButton type="button" onClick={close}>
          გაუქმება
        </CustomButton>
        <CustomButton type="submit" filled>
          დაამატე თანამშრომელი
        </CustomButton>
      </div>
    </form>
  );
};

export default CustomForm;
