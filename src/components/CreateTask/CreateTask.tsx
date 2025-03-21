import { useForm } from "react-hook-form";
import Label from "../CustomForm/Label";
import { useEffect, useState } from "react";
import EntityDropdown from "../CustomForm/EntityDropdown";
import { getDepartments, getEmployees, getPriorities, getStatuses } from "@/services/generalServices";
import { Department, Employee, Priority, Status, TaskFormInputTypes } from "@/types/types";
import { TextArea } from "react-aria-components";
import CustomDatePicker from "./CustomDatePicker";
import CustomButton from "../UI/Button/CustomButton";
import { toast } from "react-toastify";
import { createTask } from "@/services/taskServices";
import { useRouter } from "next/navigation";

const CreateTask = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [isDepartmentOpen, setIsDepartmentOpen] = useState<boolean>(false);
  const [isEmployeeOpen, setIsEmployeeOpen] = useState<boolean>(false);
  const [isPriorityOpen, setIsPriorityOpen] = useState<boolean>(false);
  const [isStatusOpen, setIsStatusOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    trigger,
    formState: { errors, isSubmitted },
  } = useForm<TaskFormInputTypes>({
    defaultValues: {
      priority: "2",
      status: "2",
    },
  });

  const titleValue = watch("title", "");
  const descriptionValue = watch("description", "");
  const selectedEmployee = watch("employee", "");
  const selectedDepartment = watch("department", "");
  const selectedPriority = watch("priority", "");
  const selectedStatus = watch("status", "");

  const onSubmit = async (data: TaskFormInputTypes) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("name", data.title);
      formData.append("status_id", data.status);
      formData.append("priority_id", data.priority);
      formData.append("department_id", data.department);
      formData.append("due_date", data.due_date || "");

      if (data.employee) {
        formData.append("employee_id", data.employee);
      }

      console.log("FORM DATA", Object.fromEntries(formData.entries()));

      const response = await createTask(formData);
      console.log("Task Created:", response);
      toast.success("დავალება წარმატებით დაემატა");

      reset();

      setTimeout(() => {
        router.push("/");
      }, 2500);
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("დაფიქსირდა შეცდომა დავალების დამატებისას");
    } finally {
      setIsLoading(false);
    }
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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    register("department", {
      required: "დეპარტამენტის არჩევა აუცილებელია",
    });
    register("employee", {
      required: "თანამშრომლის არჩევა აუცილებელია",
    });
    register("priority", {
      required: "პრიორიტეტის არჩევა აუცილებელია",
    });
    register("status", {
      required: "სტატუსის არჩევა აუცილებელია",
    });
  }, [register]);

  return (
    <div className="rounded-sm border-[0.3px] border-[#DDD2FF] bg-[#FBF9FFA6] p-4">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex h-full flex-col justify-between">
        <div className="flex w-[1200px] flex-col gap-10 pb-32">
          <div className="flex justify-between gap-[45px]">
            {/* Title */}
            <div className="flex flex-1 flex-col gap-1">
              <Label title="სათაური" htmlFor="title" isRequired />
              <input
                type="text"
                id="title"
                {...register("title", {
                  required: "Title is required",
                  minLength: { value: 3, message: "მინიმუმ 3 სიმბოლო" },
                  maxLength: { value: 255, message: "მაქსიმუმ 255 სიმბოლო" },
                })}
                className="h-[45px] rounded-md border border-[#CED4DA] bg-white p-2.5"
              />
              <div className="flex flex-col gap-1 text-[10px]">
                <span
                  className={`flex items-center gap-1 ${
                    titleValue.length >= 3
                      ? "text-green-500"
                      : isSubmitted && titleValue.length < 3
                        ? "text-red-400"
                        : "text-[#6C757D]"
                  }`}
                >
                  <p>მინიმუმ 3 სიმბოლო</p>
                </span>

                <span
                  className={`flex items-center gap-1 ${
                    titleValue.length > 255
                      ? "text-red-400"
                      : titleValue.length >= 3
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
            <div className="relative flex w-1/2 flex-col gap-1">
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
              {isSubmitted && errors.department && (
                <p className="absolute bottom-[14px] text-xs text-red-500">{errors.department.message}</p>
              )}
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
                  validate: (value) => {
                    if (value.length > 0 && value.length < 4) {
                      return "მინიმუმ 4 სიმბოლო";
                    }
                    if (value.length > 255) {
                      return "მაქსიმუმ 255 სიმბოლო";
                    }
                    return true;
                  },
                })}
                className="h-32 resize-none rounded-md border border-[#CED4DA] bg-white p-2.5"
              />
              <div className="flex flex-col gap-1 text-[10px]">
                {/* Minimum Length Validation */}
                <span
                  className={`flex items-center gap-1 ${
                    descriptionValue.length === 0
                      ? "text-[#6C757D]"
                      : descriptionValue.length < 4
                        ? "text-red-400"
                        : "text-green-500"
                  }`}
                >
                  <p>მინიმუმ 4 სიმბოლო</p>
                </span>

                {/* Maximum Length Validation */}
                <span
                  className={`flex items-center gap-1 ${
                    descriptionValue.length === 0
                      ? "text-[#6C757D]"
                      : descriptionValue.length > 255
                        ? "text-red-400"
                        : "text-green-500"
                  }`}
                >
                  <p>მაქსიმუმ 255 სიმბოლო</p>
                </span>
              </div>
            </div>

            {/* Employee Dropdown */}
            <div className="relative flex w-1/2 flex-col gap-1">
              <Label title="პასუხისმგებელი თანამშრომელი" htmlFor="employee" isRequired />
              <EntityDropdown
                name="employee"
                entities={
                  selectedDepartment ? employees.filter((emp) => String(emp.department.id) === String(selectedDepartment)) : []
                }
                selectedEntity={selectedEmployee}
                isOpen={isEmployeeOpen}
                setIsOpen={setIsEmployeeOpen}
                setValue={setValue}
                dropdownWidth={550}
                className="bg-white"
              />
              {isSubmitted && errors.employee && (
                <p className="absolute top-[78px] text-xs text-red-500">{errors.employee.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-between gap-[45px]">
            {/* Priority Dropdown */}
            <div className="flex flex-1 gap-6">
              <div className="relative flex flex-1 flex-col gap-1">
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
                {isSubmitted && errors.priority && (
                  <p className="absolute bottom-[-22px] text-xs text-red-500">{errors.priority.message}</p>
                )}
              </div>
              {/* Status Dropdown */}
              <div className="relative flex flex-1 flex-col gap-1">
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
                {isSubmitted && errors.status && (
                  <p className="absolute bottom-[-22px] text-xs text-red-500">{errors.status.message}</p>
                )}
              </div>
            </div>

            {/* Due_Date Datepicker */}
            <div className="flex w-1/2 flex-col gap-1">
              <Label title="დედლაინი" htmlFor="due_date" />
              <div className="h-full">
                <CustomDatePicker setValue={setValue} trigger={trigger} />
              </div>
            </div>
          </div>

          <CustomButton type="submit" filled className="w-[240px] self-end rounded-[5px]">
            დაამატე თანამშრომელი
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
