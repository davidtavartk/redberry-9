import { formatGeorgianDate } from "@/utils/dates";
import Image from "next/image";
import CircleAvatar from "../CustomForm/CircleAvatar";
import { CardProps } from "@/types/propTypes";

const Card = ({ task }: CardProps) => {
  return (
    <div className="flex h-[217px] cursor-pointer flex-col gap-5 rounded-[15px] border p-5">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <span className="flex items-center justify-center gap-1 rounded-sm border-[0.5px] p-1">
            <Image src={task.priority.icon} alt="priority icon" width={16} height={18} />
            <span className="text-xs font-medium">{task.priority.name}</span>
          </span>
          <span className="flex items-center justify-center rounded-[15px] bg-[#FF66A8] px-[9px] py-[5px] text-xs text-white">
            დიზაინი
          </span>
        </div>
        <span className="text-c-grey text-xs">{formatGeorgianDate(task.due_date)}</span>
      </div>

      <div className="flex flex-col gap-3 px-4">
        <h2 className="text-c-grey text-[15px] font-medium">{task.name}</h2>
        <p className="text-sm text-[#343A40] line-clamp-2 overflow-hidden text-ellipsis">{task.description}</p>
      </div>

      <div className="flex items-center justify-between">
        <CircleAvatar photoSrc={task.employee.avatar} size={31} />
        <div className="flex items-center gap-1">
          <Image src="/svgs/comment.svg" alt="comment" width={22} height={22} />
          <span className="text-c-grey text-sm">{task.total_comments}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
