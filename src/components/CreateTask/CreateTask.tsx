import { useForm } from "react-hook-form";
import Label from "../CustomForm/Label";
import { useEffect, useState } from "react";
import EntityDropdown from "../CustomForm/EntityDropdown";
import { getDepartments, getEmployees, getPriorities, getStatuses, Status } from "@/services/generalServices";
import { Department, Employee, Priority, TaskFormInputTypes } from "@/types/types";
import { TextArea } from "react-aria-components";
import CustomDatePicker from "./CustomDatePicker";

const CreateTask = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [isDepartmentOpen, setIsDepartmentOpen] = useState<boolean>(false);
  const [isEmployeeOpen, setIsEmployeeOpen] = useState<boolean>(false);
  const [isPriorityOpen, setIsPriorityOpen] = useState<boolean>(false);
  const [isStatusOpen, setIsStatusOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {},
  } = useForm<TaskFormInputTypes>();

  const titleValue = watch("title", "");
  const selectedEmployee = watch("employee", "");
  const selectedDepartment = watch("department", "");
  const selectedPriority = watch("priority", "");
  const selectedStatus = watch("status", "");

  const onSubmit = (data: TaskFormInputTypes) => {
    console.log(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [departments, employees, priorities, statuses] = await Promise.all([
          getDepartments(),
          getEmployees(),
          getPriorities(),
          getStatuses(),
        ]);

        setDepartments(departments);
        setEmployees(employees);
        setPriorities(priorities);
        setStatuses(statuses);

        console.log("Departments:", departments);
        console.log("Employees:", employees);
        console.log("Priorities:", priorities);
        console.log("Statuses:", statuses);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="rounded-sm border-[0.3px] border-[#DDD2FF] bg-[#FBF9FFA6] p-4">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex h-full flex-col justify-between">
        <div className="flex w-[1200px] flex-col gap-10">
          <div className="flex justify-between gap-[45px]">
            {/* Title */}
            <div className="flex flex-1 flex-col gap-1">
              <Label title="სათაური" htmlFor="title" isRequired />
              <input
                type="text"
                id="title"
                {...register("title", {
                  required: "Title is required",
                  minLength: { value: 2, message: "მინიმუმ 2 სიმბოლო" },
                  maxLength: { value: 255, message: "მაქსიმუმ 255 სიმბოლო" },
                })}
                className="h-[45px] rounded-md border border-[#CED4DA] p-2.5 bg-white"
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
            {/* Department Dropdown */}
            <div className="flex w-1/2 flex-col gap-1">
              <Label title="დეპარტამენტი" htmlFor="department" isRequired />
              <EntityDropdown
                name="department"
                entities={departments}
                selectedEntity={selectedDepartment}
                isOpen={isDepartmentOpen}
                setIsOpen={setIsDepartmentOpen}
                setValue={setValue}
                dropdownWidth={550}
                className="bg-white"
              />
            </div>
          </div>

          <div className="flex justify-between gap-[45px]">
            {/* Description Area */}
            <div className="flex flex-1 flex-col gap-1">
              <Label title="აღწერა" htmlFor="description" />
              <TextArea
                inputMode="text"
                id="description"
                {...register("description", {
                  minLength: { value: 4, message: "მინიმუმ 2 სიმბოლო" },
                  maxLength: { value: 255, message: "მაქსიმუმ 255 სიმბოლო" },
                })}
                className="h-32 resize-none rounded-md border border-[#CED4DA] p-2.5 bg-white"
              />
              <div className="flex flex-col gap-1 text-[10px]">
                <span
                  className={`flex items-center gap-1 ${
                    titleValue.length >= 4 ? "text-green-500" : titleValue.length > 0 ? "text-red-400" : "text-[#6C757D]"
                  }`}
                >
                  <p>მინიმუმ 4 სიმბოლო</p>
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

            {/* Employee Dropdown */}
            <div className="flex w-1/2 flex-col gap-1">
              <Label title="პასუხისმგებელი თანამშრომელი" htmlFor="employee" />
              <EntityDropdown
                name="employee"
                entities={employees}
                selectedEntity={selectedEmployee}
                isOpen={isEmployeeOpen}
                setIsOpen={setIsEmployeeOpen}
                setValue={setValue}
                dropdownWidth={550}
                className="bg-white"
              />
            </div>
          </div>

          <div className="flex justify-between gap-[45px]">
            {/* Priority Dropdown */}
            <div className="flex flex-1 gap-6">
              <div className="flex flex-1 flex-col gap-1">
                <Label title="პრიორიტეტი" htmlFor="priority" isRequired />
                <EntityDropdown
                  name="priority"
                  entities={priorities}
                  selectedEntity={selectedPriority}
                  isOpen={isPriorityOpen}
                  setIsOpen={setIsPriorityOpen}
                  setValue={setValue}
                  dropdownWidth={550}
                  className="bg-white"
                />
              </div>
              {/* Status Dropdown */}
              <div className="flex flex-1 flex-col gap-1">
                <Label title="სტატუსი" htmlFor="status" isRequired />
                <EntityDropdown
                  name="status"
                  entities={statuses}
                  selectedEntity={selectedStatus}
                  isOpen={isStatusOpen}
                  setIsOpen={setIsStatusOpen}
                  setValue={setValue}
                  dropdownWidth={550}
                  className="bg-white"
                />
              </div>
            </div>

            {/* Deadline Datepicker */}
            <div className="flex w-1/2 flex-col gap-1">
              <Label title="დედლაინი" htmlFor="deadline" />
              <CustomDatePicker />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
