import { TaskStatusProps } from "@/types/propTypes";

const TaskStatus = ({ title, className }: TaskStatusProps) => {
  return <div className={`flex items-center justify-center py-[15px] rounded-[10px] w-full ${className}`}>
    <span className="text-white text-[20px] font-medium">
        {title}
    </span>
  </div>;
};

export default TaskStatus;
