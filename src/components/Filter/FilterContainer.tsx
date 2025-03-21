"use client";

import { useDispatch, useSelector } from "react-redux";
import FilterCircle from "./FilterCircle";
import { FilterContainerProps } from "@/types/propTypes";
import { RootState } from "@/store/store";
import { resetFilters, setDepartments, setEmployees, setPriorities } from "@/store/taskFilterSlice";
import { useEffect, useState } from "react";

const FilterContainer = ({ departments, priorities, employees }: FilterContainerProps) => {
  const filters = useSelector((state: RootState) => state.taskFilters);

  const dispatch = useDispatch();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const hasFilters = filters.departmentIds.length > 0 || filters.priorityIds.length > 0 || filters.employeeIds.length > 0;

  return (
    <div className="flex flex-wrap gap-4">
      {/* Departments */}
      {filters.departmentIds.map((id) => {
        const department = departments.find((d) => d.id === id);
        return department ? (
          <FilterCircle
            key={`dep-${id}`}
            filter={department.name}
            onRemove={() => {
              dispatch(setDepartments(filters.departmentIds.filter((depId) => depId !== id)));
            }}
          />
        ) : null;
      })}

      {/* Priorities */}
      {filters.priorityIds.map((id) => {
        const priority = priorities.find((p) => p.id === id);
        return priority ? (
          <FilterCircle
            key={`prio-${id}`}
            filter={priority.name}
            onRemove={() => {
              dispatch(setPriorities(filters.priorityIds.filter((pId) => pId !== id)));
            }}
          />
        ) : null;
      })}

      {/* Employees */}
      {filters.employeeIds.map((id) => {
        const employee = employees.find((e) => e.id === id);
        return employee ? (
          <FilterCircle
            key={`emp-${id}`}
            filter={`${employee.name} ${employee.surname}`}
            onRemove={() => {
              dispatch(setEmployees(filters.employeeIds.filter((eId) => eId !== id)));
            }}
          />
        ) : null;
      })}

      {hasFilters && (
        <button onClick={() => dispatch(resetFilters())} className="ml-4 cursor-pointer text-sm text-[#343A40]">
          გასუფთავება
        </button>
      )}
    </div>
  );
};

export default FilterContainer;
