import { FilterCircleProps } from "@/types/propTypes";
import Image from "next/image";
import React from "react";

const FilterCircle = ({ filter, onRemove }: FilterCircleProps) => {
  return (
    <div
    onClick={onRemove}
      className="flex cursor-pointer items-center justify-between gap-1 rounded-[43px] border border-[#CED4DA] px-2.5 py-1.5 text-sm"
    >
      <span className="text-[#343A40]">{filter}</span>
      <Image src="/svgs/xIcon.svg" alt="deleteIcon" width={14} height={14} />
    </div>
  );
};

export default FilterCircle;
