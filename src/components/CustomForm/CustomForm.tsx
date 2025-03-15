"use client";

import { useForm } from "react-hook-form";
import Label from "./Label";
import { Button, ListBox, ListBoxItem, Popover, Select, SelectStateContext, SelectValue } from "react-aria-components";
import { useContext, useEffect, useState } from "react";
import { getDepartments } from "@/services/generalServices";
import { Department } from "@/types/types";
import Image from "next/image";
import CircleAvatar from "./CircleAvatar";
import CustomButton from "../UI/Button/CustomButton";
// import debounce from "debounce";
import CheckIcon from "../../../public/svgs/svgComponent/CheckIcon";

type FormInputTypes = {
  name: string;
  lastname: string;
  department: string;
  avatar: File | null;
};

const CustomForm = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [inputKey, setInputKey] = useState<number>(Date.now());

  const state = useContext(SelectStateContext);
  console.log("State:", state);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormInputTypes>();

  const formValues = watch();
  const nameValue = watch("name", "");
  const lastnameValue = watch("lastname", "");

  // Log form values whenever they change
  useEffect(() => {
    console.log(formValues);
  }, [formValues]);

  const onSubmit = (data: FormInputTypes) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("lastname", data.lastname);
    formData.append("department", data.department);
    // formData.append("avatar", data.avatar[0]);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    console.log("FILE:", files);

    if (!files || files.length === 0) {
      setPreview(null);
      setValue("avatar", null);
      return;
    }

    const file = files[0];
    const maxSizeInBytes = 600 * 1024; // 600KB limit

    if (file.size > maxSizeInBytes) {
      e.target.value = "";
      setPreview(null);
      setValue("avatar", null);
    } else {
      setPreview(URL.createObjectURL(file));
      setValue("avatar", file);
      await trigger("avatar"); // ✅ Manually trigger validation
    }
  };

  const removeImage = () => {
    setPreview(null);
    setValue("avatar", null);
    setInputKey(Date.now());
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
              onInput={() => trigger("name")}
              className="h-[42px] rounded-md border border-[#CED4DA] p-2.5"
            />
            <div className="flex flex-col gap-1 text-[10px]">
              <span
                className={`flex items-center gap-1 ${
                  nameValue.length >= 2
                    ? "text-green-500" // ✅ Valid (Green)
                    : nameValue.length > 0
                      ? "text-red-400" // ❌ Invalid (Red, when typing but not valid)
                      : "text-[#6C757D]" // ⏳ Default Grey (Empty)
                }`}
              >
                <CheckIcon
                  fill={
                    nameValue.length >= 2
                      ? "#00C951" // ✅ Green
                      : nameValue.length > 0
                        ? "red" // ❌ Red
                        : "#6C757D" // ⏳ Grey
                  }
                  width="16"
                  height="16"
                />
                <p>მინიმუმ 2 სიმბოლო</p>
              </span>

              <span
                className={`flex items-center gap-1 ${
                  nameValue.length > 255
                    ? "text-red-400" // ❌ Red (Too long)
                    : nameValue.length >= 2
                      ? "text-green-500" // ✅ Green (Valid)
                      : nameValue.length > 0
                        ? "text-red-400" // ❌ Red (If typing but invalid)
                        : "text-[#6C757D]" // ⏳ Default Grey (Empty)
                }`}
              >
                <CheckIcon
                  fill={
                    nameValue.length > 255
                      ? "red" // ❌ Red (Too long)
                      : nameValue.length >= 2
                        ? "#00C951" // ✅ Green (Valid)
                        : nameValue.length > 0
                          ? "red" // ❌ Red (If typing but invalid)
                          : "#6C757D" // ⏳ Default Grey (Empty)
                  }
                  width="16"
                  height="16"
                />
                <p>მაქსიმუმ 255 სიმბოლო</p>
              </span>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-1">
            <Label title="გვარი" htmlFor="lastname" />

            <input
              type="text"
              id="lastname"
              {...register("lastname", {
                required: "Name is required",
                minLength: { value: 2, message: "მინიმუმ 2 სიმბოლო" },
                maxLength: { value: 255, message: "მაქსიმუმ 255 სიმბოლო" },
              })}
              onInput={() => trigger("lastname")}

              className="h-[42px] rounded-md border border-[#CED4DA] p-2.5"
            />
            <div className="flex flex-col gap-1 text-[10px]">
              <span
                className={`flex items-center gap-1 ${
                  lastnameValue.length >= 2
                    ? "text-green-500" // ✅ Green (Valid)
                    : lastnameValue.length > 0
                      ? "text-red-400" // ❌ Red (If typing but invalid)
                      : "text-[#6C757D]" // ⏳ Default Grey (Empty)
                }`}
              >
                <CheckIcon
                  fill={
                    lastnameValue.length >= 2
                      ? "#00C951" // ✅ Green (Valid)
                      : lastnameValue.length > 0
                        ? "red" // ❌ Red (If typing but invalid)
                        : "#6C757D" // ⏳ Default Grey (Empty)
                  }
                  width="16"
                  height="16"
                />
                <p>მინიმუმ 2 სიმბოლო</p>
              </span>

              {/* ✅ Maximum Length Validation */}
              <span
                className={`flex items-center gap-1 ${
                  lastnameValue.length > 255
                    ? "text-red-400" // ❌ Red (Too long)
                    : lastnameValue.length >= 2
                      ? "text-green-500" // ✅ Green (Valid)
                      : lastnameValue.length > 0
                        ? "text-red-400" // ❌ Red (If typing but invalid)
                        : "text-[#6C757D]" // ⏳ Default Grey (Empty)
                }`}
              >
                <CheckIcon
                  fill={
                    lastnameValue.length > 255
                      ? "red" // ❌ Red (Too long)
                      : lastnameValue.length >= 2
                        ? "#00C951" // ✅ Green (Valid)
                        : lastnameValue.length > 0
                          ? "red" // ❌ Red (If typing but invalid)
                          : "#6C757D" // ⏳ Default Grey (Empty)
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
                <CircleAvatar photoSrc="/images/avatar.png" />
              </label>
            )}
            <input
              key={inputKey}
              type="file"
              id="photo"
              accept="image/*"
              className="hidden"
              {...register("avatar", {
                required: "სურათის ატვირთვა აუცილებელია!!!@!@", // ✅ This now properly validates
              })}
              onChange={handleFileChange} // ✅ This ensures validation updates properly
            />
          </div>
          {errors.avatar && <p className="text-xs text-red-500">{errors.avatar.message}</p>}
        </div>

        {/* Department */}
        <div className="flex w-1/2 flex-col gap-1">
          <Label title="დეპარტამენტი" htmlFor="department" />
          <Select id="department" selectedKey={selectedDepartment} aria-labelledby="department-label">
            <Button
              className={`flex w-full cursor-pointer items-center justify-between border border-[#CED4DA] p-3 text-left ${state?.isOpen ? "rounded-b-none border-b-0" : "rounded-md"}`}
            >
              <SelectValue>
                {({ defaultChildren, isPlaceholder }) => {
                  return isPlaceholder ? <></> : defaultChildren;
                }}
              </SelectValue>
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
      </div>



      
      <div className="flex gap-[15px] self-end">
        <CustomButton type="button">გაუქმება</CustomButton>
        <CustomButton type="submit" filled>
          დაამატე თანამშრომელი
        </CustomButton>
      </div>
    </form>
  );
};

export default CustomForm;
