import { TextArea } from "react-aria-components";
import { useForm } from "react-hook-form";
import CustomButton from "../UI/Button/CustomButton";
import { createTaskComment, getTaskComments } from "@/services/generalServices";
import { useEffect, useState } from "react";
import { CommentsCardProps } from "@/types/propTypes";
import { CommentFormTypes, TaskComment } from "@/types/types";
import EachComment from "./EachComment";
import { toast } from "react-toastify";
import { debounceFn } from "@/utils/general";

const CommentsCard = ({ taskId }: CommentsCardProps) => {
  const [comments, setComments] = useState<TaskComment[]>([]);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<CommentFormTypes>({ defaultValues: { text: "" } });

  const onSubmit = async (data: CommentFormTypes) => {
    try {
      const formData = new FormData();
      formData.append("text", data.text);

      if (replyingTo) {
        formData.append("parent_id", replyingTo.toString());
      }

      console.log("FORM DATA", Object.fromEntries(formData.entries()));

      const response = await createTaskComment(taskId, formData);
      console.log("Comment added:", response);
      setComments((prev) => {
        if (replyingTo) {
          return prev.map((comment) =>
            comment.id === replyingTo
              ? { ...comment, sub_comments: [...(comment.sub_comments || []), response] }
              : comment
          );
        }
        return [response, ...prev];
      });
      
      toast.success("კომენტარი წარმატებით დაემატა");
      reset();
    } catch (error) {
      console.error("Error creating employee:", error);
      toast.error("დაფიქსირდა შეცდომა თანამშრომლის დამატებისას");
    }
  };

  const debouncedValidate = debounceFn(() => {
    trigger("text");
  }, 500);

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex flex-col gap-16 rounded-[10px] border-[0.3px] border-[#DDD2FF] bg-[#F8F3FEA6] p-12"
    >
      {replyingTo && (
        <p className="absolute top-4 mb-2 flex gap-4 text-sm text-gray-600">
          პასუხობ {comments.find((c) => c.id === replyingTo)?.author_nickname}-ის კომენტარს
          <span
            className="cursor-pointer text-red-500"
            onClick={() => {
              setReplyingTo(null);
              reset();
            }}
          >
            გაუქმება
          </span>
        </p>
      )}
      <div className="relative h-36 border border-[#CED4DA] bg-white">
        <TextArea
          inputMode="text"
          placeholder="დაწერე კომენტარი"
          id="text"
          rows={3}
          {...register("text", {
            required: "კომენტარი არ დაგიწერიათ...",
            minLength: { value: 4, message: "მინიმუმ 4 სიმბოლო" },
            maxLength: { value: 255, message: "მაქსიმუმ 255 სიმბოლო" },
            validate: (value) => value.trim() !== "" || "მხოლოდ სიცარიელეს ვერ გამოაქვეყნებთ",
          })}
          onChange={(e) => {
            setValue("text", e.target.value);
            debouncedValidate();
          }}
          className="h-20 w-full resize-none overflow-hidden rounded-md p-5 pb-12 text-sm font-light outline-none placeholder:text-[#898989]"
        />
        {<p className="absolute bottom-[-22px] text-xs text-red-500">{errors.text?.message}</p>}
        <CustomButton filled className="absolute right-3 bottom-5 h-[35px] w-[155px] rounded-[60px]" type="submit">
          {replyingTo ? "უპასუხე" : "დააკომენტარე"}
        </CustomButton>
      </div>

      <div className="flex items-center gap-2">
        <h3 className="text-xl font-medium">კომენტარები</h3>
        <span className="flex items-center justify-center rounded-full bg-[#8338EC] px-4 py-2 text-sm font-medium text-white">
          {comments.length}
        </span>
      </div>

      <div className="flex flex-col gap-16">
        {comments.map((comment) => (
          <div key={comment.id}>
            {/* ✅ Parent Comment */}
            <EachComment
              comment={comment}
              setReplyingTo={setReplyingTo}
              isReplyingTo={replyingTo === comment.id ? comment.id : null}
            />

            {/* ✅ Replies (Child Comments) */}
            {comment.sub_comments && comment.sub_comments.length > 0 && (
              <div className="mt-4 ml-8 pl-4">
                {comment.sub_comments.map((childComment) => (
                  <EachComment key={childComment.id} comment={childComment} isChildComment={true} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </form>
  );
};

export default CommentsCard;
