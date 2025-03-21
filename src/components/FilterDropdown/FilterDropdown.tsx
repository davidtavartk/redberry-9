import { FilterDropdownProps } from "@/types/propTypes";
import { Department, Priority } from "@/types/types";
import Image from "next/image";
import { useState } from "react";
import { Button, Checkbox, Dialog, DialogTrigger, Popover } from "react-aria-components";
import CustomButton from "../UI/Button/CustomButton";
import CheckIcon from "../../../public/svgs/svgComponent/CheckIcon";
import { useDispatch } from "react-redux";
import { setDepartments, setEmployees, setPriorities } from "@/store/taskFilterSlice";

const FilterDropdown = ({ title, filters }: FilterDropdownProps) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);


  const dispatch = useDispatch();

  const toggleFilter = (filter: Department | Priority) => {
    setSelectedFilters((prev) => (prev.includes(filter.name) ? prev.filter((f) => f !== filter.name) : [...prev, filter.name]));
  };

  const applyFilters = () => {
    const selectedIds = filters
      .filter((filter) => selectedFilters.includes(filter.name))
      .map((filter) => filter.id);
  
    if (title === "დეპარტამენტი") {
      dispatch(setDepartments(selectedIds));
      console.log("Selected Departments:", selectedIds);
    }
  
    if (title === "პრიორიტეტი") {
      dispatch(setPriorities(selectedIds));
      console.log("Selected Priorities:", selectedIds);
    }
  
    if (title === "თანამშრომელი") {
      dispatch(setEmployees(selectedIds));
      console.log("Selected Employees:", selectedIds);
    }
    setIsOpen(false);
  };
  

  return (
    <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button className="flex cursor-pointer items-center gap-2 px-[18px] text-[#0D0F10]">
        {title}{" "}
        <span>
          <Image src="/svgs/downArrow.svg" alt="arrow" height={24} width={24} />
        </span>{" "}
      </Button>
      <Popover className="w-[688px] rounded-[10px] border-[0.5px] border-[#8338EC] bg-white" offset={20} placement="bottom start">
        <Dialog>
          <div className="flex flex-col gap-[25px] p-4 px-[30px] pt-10 pb-5">
            {filters.length > 0 ? (
              filters.map((filter) => (
                <Checkbox
                  key={filter.id}
                  isSelected={selectedFilters.includes(filter.name)}
                  onChange={() => toggleFilter(filter)}
                  className="mb-2 flex cursor-pointer items-center gap-3.5"
                >
                  <div
                    className={`flex size-[22px] items-center justify-center rounded-[6px] border-[1.5px] transition-all ${title !== "დეპარტამენტი" ? "border-c-purple" : ""} `}
                  >
                    {selectedFilters.includes(filter.name) && (
                      <CheckIcon fill={title !== "დეპარტამენტი" ? "#8338EC" : "#212529"} />
                    )}
                  </div>

                  {title === "თანამშრომელი" && "avatar" in filter && "surname" in filter ? (
                    <div className="flex items-center gap-2">
                      <Image
                        src={filter.avatar as string}
                        alt="avatar"
                        width={24}
                        height={24}
                        className="h-6 w-6 rounded-full object-cover"
                      />
                      <span className="ml-2">{`${filter.name} ${filter.surname}`}</span>
                    </div>
                  ) : (
                    <span className="ml-2">{filter.name}</span>
                  )}
                </Checkbox>
              ))
            ) : (
              <div className="pb-3 text-center text-xl text-gray-500">No Data Available</div>
            )}

            {filters.length > 0 && (
              <CustomButton onClick={applyFilters} filled className="w-[155px] self-end rounded-[20px] !py-2">
                არჩევა
              </CustomButton>
            )}
          </div>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
};
export default FilterDropdown;
