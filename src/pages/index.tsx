"use client";

import FilterDropdown from "@/components/FilterDropdown/FilterDropdown";
import TaskStatus from "@/components/UI/TaskStatus/TaskStatus";
import { getDepartments, getEmployees, getPriorities } from "@/services/generalServices";
import { getAllTasks } from "@/services/taskServices";
import { Department, Employee, Priority, Task } from "@/types/types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import FilterContainer from "@/components/Filter/FilterContainer";

export default function Home() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const filters = useSelector((state: RootState) => state.taskFilters);

  const filteredTasks = tasks.filter((task) => {
    const departmentMatch = filters.departmentIds.length === 0 || filters.departmentIds.includes(task.department.id);
    const priorityMatch = filters.priorityIds.length === 0 || filters.priorityIds.includes(task.priority.id);
    const employeeMatch = filters.employeeIds.length === 0 || filters.employeeIds.includes(task.employee.id);

    return departmentMatch && priorityMatch && employeeMatch;
  });

  useEffect(() => {
    console.log("Applied Filters:", filters);
    console.log("Filtered Tasks:", filteredTasks);
  }, [filters, tasks, filteredTasks]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [departments, priorities, employees, tasks] = await Promise.all([
          getDepartments(),
          getPriorities(),
          getEmployees(),
          getAllTasks(),
        ]);

        setDepartments(departments);
        setPriorities(priorities);
        setEmployees(employees);
        setTasks(tasks);

        console.log("Departments:", departments);
        console.log("Priorities:", priorities);
        console.log("Employees:", employees);
        console.log("Tasks:", tasks);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="px-[120px] py-10">
      <h1 className="text-c-grey pb-8 text-[34px] font-semibold">დავალებების გვერდი</h1>
      <div className="flex w-fit flex-none gap-[45px] rounded-[10px] border border-[#DEE2E6] py-2.5">
        <FilterDropdown title="დეპარტამენტი" filters={departments} />
        <FilterDropdown title="პრიორიტეტი" filters={priorities} />
        <FilterDropdown title="თანამშრომელი" filters={employees} />
      </div>
      <div className="pt-4">
        <FilterContainer departments={departments} priorities={priorities} employees={employees} />
      </div>
      <div className="mt-20 flex justify-between gap-20">
        <TaskStatus status="დასაწყები" className="bg-[#F7BC30]" tasks={filteredTasks.filter((task) => task.status.id === 1)} />
        <TaskStatus status="პროგრესში" className="bg-[#FB5607]" tasks={filteredTasks.filter((task) => task.status.id === 2)} />
        <TaskStatus
          status="მზად ტესტირებისთვის"
          className="bg-[#FF006E]"
          tasks={filteredTasks.filter((task) => task.status.id === 3)}
        />
        <TaskStatus status="დასრულებული" className="bg-[#3A86FF]" tasks={filteredTasks.filter((task) => task.status.id === 4)} />
      </div>
    </div>
  );
}
