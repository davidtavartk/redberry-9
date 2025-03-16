import { EntityDropdownProps } from "@/types/propTypes";
import { FormInputTypes } from "@/types/types";
import Image from "next/image";
import { Button, ListBox, ListBoxItem, Popover, Select, SelectValue } from "react-aria-components";

const EntityDropdown = <T extends keyof FormInputTypes>({
  name,
  selectedEntity,
  entities,
  isOpen,
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
          setValue(name, selected.name, { shouldValidate: true });
          setIsOpen(false);
        }
      }}
    >
      <Button
        className={`flex w-full cursor-pointer items-center justify-between border border-[#CED4DA] p-3 text-left ${isOpen ? "rounded-b-none border-b-0" : "rounded-md"}`}
      >
        <SelectValue>{() => selectedEntity || ""}</SelectValue>
        <span aria-hidden="true" className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
          <Image src="/svgs/formArrow.svg" alt="arrow" width={14} height={14} />
        </span>
      </Button>
      <Popover
        className="rounded-md rounded-t-none border border-t-0 border-[#CED4DA] bg-white p-3 pb-1.5"
        placement="bottom start"
        offset={-6}
      >
        <ListBox>
          {entities.map((entity) => (
            <ListBoxItem key={entity.id} id={entity.id} className="h-[42px] cursor-pointer hover:scale-[101%]">
              {entity.name}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </Select>
  );
};

export default EntityDropdown;
