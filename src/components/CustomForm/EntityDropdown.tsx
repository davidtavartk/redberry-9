import { EntityDropdownProps } from "@/types/propTypes";
import { EmployeeFormInputTypes, TaskFormInputTypes } from "@/types/types";
import Image from "next/image";
import { Button, DialogTrigger, ListBox, ListBoxItem, Popover, Select, SelectValue } from "react-aria-components";
import CircleAvatar from "./CircleAvatar";
import CustomButton from "../UI/Button/CustomButton";
import EmployeeModal from "../EmployeeModal/EmployeeModal";

const EntityDropdown = <T extends keyof (EmployeeFormInputTypes | TaskFormInputTypes) | "priority" | "status">({
  name,
  selectedEntity,
  entities,
  isOpen,
  dropdownWidth,
  className,
  setIsOpen,
  setValue,
}: EntityDropdownProps<T>) => {
  return (
    <Select
      id={name}
      selectedKey={selectedEntity ?? ""}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      aria-labelledby={`${name}-label`}
      onSelectionChange={(key) => {
        const selected = entities.find((entity) => entity.id === key);
        if (selected) {
          setValue(name, String(selected.id), { shouldValidate: true });
          setIsOpen(false);
        }
      }}
    >
      <Button
        className={`flex w-full cursor-pointer items-center justify-between border border-[#CED4DA] p-3 text-left ${isOpen ? "rounded-b-none border-b-0" : "rounded-md"} ${className}`}
      >
        <SelectValue>
          {() => {
            const selected = entities.find((entity) => String(entity.id) === String(selectedEntity));

            const placeholderMap: Record<string, string> = {
              department: "აირჩიეთ დეპარტამენტი",
              status: "აირჩიეთ სტატუსი",
              priority: "აირჩიეთ პრიორიტეტი",
              employee: "აირჩიეთ თანამშრომელი",
            };

            const placeholder = placeholderMap[name] || `აირჩიეთ ${name}`;

            if (!selected) {
              return placeholder;
            }

            return (
              <>
                {"avatar" in selected && selected.avatar ? (
                  <Image
                    src={selected.avatar as string}
                    alt="avatar"
                    width={24}
                    height={24}
                    className="inline-block h-6 w-6 rounded-full object-cover"
                  />
                ) : "icon" in selected && selected.icon ? (
                  <Image
                    src={selected.icon as string}
                    alt="icon"
                    width={24}
                    height={24}
                    className="inline-block h-6 w-6 rounded-full object-cover"
                  />
                ) : null}

                <span className="ml-2">
                  <>
                    {selected.name} {"surname" in selected && selected.surname ? selected.surname : ""}
                  </>
                </span>
              </>
            );
          }}
        </SelectValue>

        <span aria-hidden="true" className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
          <Image src="/svgs/formArrow.svg" alt="arrow" width={14} height={14} />
        </span>
      </Button>
      <Popover
        className={`rounded-md rounded-t-none border border-t-0 border-[#CED4DA] bg-white p-3 pb-1.5`}
        style={{ width: `${dropdownWidth}px` }}
        placement="bottom start"
        offset={0}
      >
        <div className={name === "employee" ? "space-y-3 pt-3" : ""}>
          {name === "employee" && (
            <div className="px-2">
              <DialogTrigger onOpenChange={(isOpen) => !isOpen && setIsOpen(false)}>
                <CustomButton className="!hover:bg-transparent !border-none !pl-0 flex gap-2 items-center justify-center mb-1"
                >
                <Image src="/svgs/addEmpl.svg" alt="deleteIcon" width={14} height={14} />
                  დაამატე თანამშრომელი</CustomButton>
                <EmployeeModal />
              </DialogTrigger>
            </div>
          )}
          <ListBox>
            {entities && entities.length > 0 ? (
              entities.map((entity) => (
                <ListBoxItem
                  key={entity.id}
                  id={entity.id}
                  className="h-[45px] cursor-pointer hover:scale-[101%]"
                  textValue={"surname" in entity ? `${entity.name} ${entity.surname}` : entity.name}
                >
                  <div className="flex gap-3">
                    {"avatar" in entity ? (
                      <CircleAvatar photoSrc={entity.avatar as string} size={28} />
                    ) : "icon" in entity ? (
                      <CircleAvatar photoSrc={entity.icon as string} size={28} />
                    ) : null}
                    {"surname" in entity ? `${entity.name} ${entity.surname}` : entity.name}
                  </div>
                </ListBoxItem>
              ))
            ) : (
              <ListBoxItem
                key="no-data"
                id="no-data"
                className="h-[45px] cursor-default text-gray-500"
                textValue="No data available"
                aria-disabled="true"
              >
                <div className="text-sm text-gray-500">არჩევანი არ არსებობს</div>
              </ListBoxItem>
            )}
          </ListBox>
        </div>
      </Popover>
    </Select>
  );
};

export default EntityDropdown;
