import CircleAvatar from "@/components/CustomForm/CircleAvatar";
import { getTaskById } from "@/services/taskServices";
import { Task } from "@/types/types";
import { formatGeorgianDateWithWeekday } from "@/utils/dates";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const TaskPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getTaskById(Number(id));
        console.log(response);
        setTask(response);
      } catch (error) {
        console.error("Error fetching task by id:", error);
      }
    };

    fetchTask();
  }, [id]);

  if (!task) return <div className="flex items-center justify-center text-4xl">Loading task with id: {id}</div>;

  return (
    <div className="flex gap-72 px-[120px] pt-16">
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex gap-[18px]">
          <span className="flex items-center justify-center gap-1 rounded-[3px] border-[0.5px] p-1">
            <Image src={task.priority.icon} alt="priority icon" width={16} height={18} />
            <span className="text-xs font-medium">{task.priority.name}</span>
          </span>
          <span className="flex items-center justify-center rounded-[15px] bg-[#FF66A8] px-[9px] py-[5px] text-xs text-white">
            დიზაინი
          </span>
        </div>
        <div className="flex flex-col gap-6 pt-10">
          <h2 className="text-c-grey text-[34px] font-semibold">{task.name}</h2>
          <p className="text-lg leading-[150%]">
            {task.description}lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus rerum, in esse quisquam vel,
            neque distinctio quae quibusdam alias architecto facilis nihil fuga quam, et rem obcaecati corrupti! Dolore,
            nesciunt.{" "}
          </p>
        </div>

        {/* Task Details */}
        <h1 className="text-[#2A2A2A pt-14 text-2xl font-medium">დავალების დეტალები</h1>
        <div className="mt-4 flex gap-20 pt-4">
          <div className="flex flex-col justify-between gap-10">
            <span className="flex w-[164px] gap-3">
              <Image src="/svgs/status.svg" alt="status icon" width={24} height={24} />
              <span className="text-[#474747]">სტატუსი</span>
            </span>
            <span className="flex gap-3">
              <Image src="/svgs/user.svg" alt="user icon" width={24} height={24} />
              <span className="text-[#474747]">თანამშრომელი</span>
            </span>
            <span className="flex gap-3">
              <Image src="/svgs/calendar.svg" alt="calendar icon" width={24} height={24} />
              <span className="text-[#474747]">დავალების ვადა</span>
            </span>
          </div>
          <div className="flex w-fit flex-col justify-between gap-10">
            <span>მზად ტესტირებისთვის</span>
            <div className="flex items-center gap-2">
              <CircleAvatar photoSrc={task.employee.avatar} size={32} />
              <div className="flex flex-col">
                <span className="text-[11px] font-light text-[#474747]">{task.department.name}</span>
                <span className="text-sm text-[#0D0F10]">
                  {task.employee.name} {task.employee.surname}
                </span>
              </div>
            </div>
            <div className="flex justify-between">
              <span>{formatGeorgianDateWithWeekday(task.due_date)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="flex-1"></div>
    </div>
  );
};

export default TaskPage;
