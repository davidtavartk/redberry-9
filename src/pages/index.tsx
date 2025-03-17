import FilterDropdown from "@/components/FilterDropdown/FilterDropdown";
import TaskStatus from "@/components/UI/TaskStatus/TaskStatus";
import { getDepartments, getEmployees, getPriorities } from "@/services/generalServices";
import { getAllTasks } from "@/services/taskServices";
import { Department, Employee, Priority, Task } from "@/types/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]); 

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
      <div className="flex justify-between gap-20 mt-20">
        <TaskStatus status="დასაწყები" className="bg-[#F7BC30]" tasks={tasks}/>
        <TaskStatus status="პროგრესში" className="bg-[#FB5607]"  tasks={[]} />
        <TaskStatus status="მზად ტესტირებისთვის" className="bg-[#FF006E]"  tasks={[]} />
        <TaskStatus status="დასრულებული" className="bg-[#3A86FF]"  tasks={[]} />
      </div>
    </div>
  );
}
