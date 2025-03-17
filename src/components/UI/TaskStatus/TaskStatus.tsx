import Card from "@/components/Card/Card";
import { TaskStatusProps } from "@/types/propTypes";
import Link from "next/link";

const TaskStatus = ({ status, className, tasks }: TaskStatusProps) => {
  return (
    <div className="flex flex-col gap-[30px] w-full ">
      <div className={`flex items-center justify-center rounded-[10px] py-[15px] ${className}`}>
        <span className="text-[20px] font-medium text-white">{status}</span>
      </div>

      <div className="flex flex-col gap-[30px]">
        {tasks.map((task) => (
            <Link key={task.id} href={`/tasks/${task.id}`}>

                <Card key={task.id} task={task} />
            </Link>
        ))}
      </div>
    </div>
  );
};

export default TaskStatus;