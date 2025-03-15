import FilterDropdown from "@/components/FilterDropdown/FilterDropdown";
import { getDepartments, getEmployees, getPriorities } from "@/services/generalServices";
import { Department, Employee, Priority } from "@/types/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getDepartments();
        setDepartments(data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    const fetchPriorities = async () => {
      try {
        const data = await getPriorities();
        setPriorities(data);
      } catch (error) {
        console.error("Error fetching Priorities:", error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching Employees:", error);
      }
    };

    fetchDepartments();
    fetchPriorities();
    fetchEmployees();
  }, []);

  return (
    <div className="px-[120px] py-10">
      <h1 className="text-c-grey pb-8 text-[34px] font-semibold">დავალებების გვერდი</h1>
      <div className="flex w-fit flex-none gap-[45px] rounded-[10px] border border-[#DEE2E6] py-2.5">
        <FilterDropdown title="დეპარტამენტი" filters={departments} />
        <FilterDropdown title="პრიორიტეტი" filters={priorities} />
        <FilterDropdown title="თანამშრომელი" filters={employees} />
      </div>
    </div>
  );
}
