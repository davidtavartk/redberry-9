import { TextArea } from "react-aria-components";
import { useForm } from "react-hook-form";
import CustomButton from "../UI/Button/CustomButton";
import { getTaskComments } from "@/services/generalServices";
import { useEffect, useState } from "react";
import { CommentsCardProps } from "@/types/propTypes";
import { TaskComment } from "@/types/types";

const CommentsCard = ({ taskId }: CommentsCardProps) => {
  const [comments, setComments] = useState<TaskComment[]>([]);
  const {
    register,
    // handleSubmit,

    // formState: { errors, isSubmitted },
  } = useForm({});

  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (!taskId) return;
        const comments = await getTaskComments(taskId);
        setComments(comments);
        console.log("Comments:", comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [taskId]);

  return (
    <div className="flex flex-col gap-16 rounded-[10px] border-[0.3px] border-[#DDD2FF] bg-[#F8F3FEA6] p-12">
      <div className="relative">
        <TextArea
          inputMode="text"
          placeholder="დაწერე კომენტარი"
          id="description"
          {...register("comment", {
            minLength: { value: 4, message: "მინიმუმ 2 სიმბოლო" },
            maxLength: { value: 255, message: "მაქსიმუმ 255 სიმბოლო" },
          })}
          className="h-32 w-full resize-none rounded-md border border-[#CED4DA] bg-white p-4 pb-12 text-sm font-light placeholder:text-[#898989]"
        />
        <CustomButton filled className="absolute right-3 bottom-6 h-[35px] w-[155px] rounded-[60px]">
          დააკომენტარე
        </CustomButton>
      </div>

      <div className="flex items-center gap-2">
        <h3 className="text-xl font-medium">კომენტარები</h3>
        <span className="flex items-center justify-center rounded-full bg-[#8338EC] px-4 py-2 text-sm font-medium text-white">
          {comments.length}
        </span>
      </div>
    </div>
  );
};

export default CommentsCard;
