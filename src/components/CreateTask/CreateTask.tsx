import { useForm } from "react-hook-form";
import Label from "../CustomForm/Label";
import DepartmentDropdown from "../CustomForm/EntityDropdown";
import { useState } from "react";
import EntityDropdown from "../CustomForm/EntityDropdown";

type FormInputTypes = {
  title: string;
  department: string;
  description: string;
  responsible_employee: string;
};

const CreateTask = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormInputTypes>();

  const titleValue = watch("title", "");
  const selectedDepartment = watch("department");

  const onSubmit = (data: FormInputTypes) => {
    console.log(data);
  };

  return (
    <div className="rounded-sm border-[0.3px] border-[#DDD2FF] bg-[#FBF9FFA6] p-4">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex h-full flex-col justify-between">
        <div className="flex w-[1200px] flex-col gap-10">
          <div className="flex justify-between gap-[45px]">
            {/* Title */}
            <div className="flex flex-1 flex-col gap-1">
              <Label title="სათაური" htmlFor="text" />
              <input
                type="text"
                id="name"
                {...register("title", {
                  required: "Title is required",
                  minLength: { value: 2, message: "მინიმუმ 2 სიმბოლო" },
                  maxLength: { value: 255, message: "მაქსიმუმ 255 სიმბოლო" },
                })}
                className="h-[42px] rounded-md border border-[#CED4DA] p-2.5"
              />
              <div className="flex flex-col gap-1 text-[10px]">
                <span
                  className={`flex items-center gap-1 ${
                    titleValue.length >= 2 ? "text-green-500" : titleValue.length > 0 ? "text-red-400" : "text-[#6C757D]"
                  }`}
                >
                  <p>მინიმუმ 2 სიმბოლო</p>
                </span>

                <span
                  className={`flex items-center gap-1 ${
                    titleValue.length > 255
                      ? "text-red-400"
                      : titleValue.length >= 2
                        ? "text-green-500"
                        : titleValue.length > 0
                          ? "text-red-400"
                          : "text-[#6C757D]"
                  }`}
                >
                  <p>მაქსიმუმ 255 სიმბოლო</p>
                </span>
              </div>
            </div>

            <div className="flex w-1/2 flex-col gap-1">
              <Label title="დეპარტამენტი" htmlFor="department" />
              {/* <EntityDropdown
                name="employees"
                entities={employees}
                selectedEntity={selectedDepartment}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                setValue={setValue}
              /> */}
            </div>
          </div>

          <div></div>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
