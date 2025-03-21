import { EachCommentProps } from "@/types/propTypes";
import CircleAvatar from "../CustomForm/CircleAvatar";
import ReplyButton from "./ReplyButton";

const EachComment = ({ comment, isChildComment = false, setReplyingTo, isReplyingTo }: EachCommentProps) => {
  return (
    <div
      className={`flex items-start gap-3 rounded-md p-4 ${isReplyingTo ? "bg-[#E9D8FD]" : ""} transition duration-300`}
    >
      <CircleAvatar photoSrc={comment.author_avatar} size={38} />
      <div className="flex flex-col gap-3">
        <h3 className="text-c-grey self-start text-lg leading-none font-medium">{comment.author_nickname}</h3>
        <p className="font-light text-[#343A40]">
          {comment.text} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro molestias vel repellendus sed numquam
          officiis dolorem nemo tempore a, facere illo dolores consequatur. Velit, nesciunt magni. Optio nisi modi nesciunt.
        </p>
        <span className="pt-2">

        {!isChildComment && setReplyingTo && (
          <ReplyButton
            onClick={() => setReplyingTo(comment.id)}
          />
        )}
        </span>
      </div>
    </div>
  );
};

export default EachComment;
