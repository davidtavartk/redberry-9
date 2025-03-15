import { CircleAvatarProps } from "@/types/propTypes";
import Image from "next/image";

const CircleAvatar = ({photoSrc="/images/avatar.png", onRemove}:CircleAvatarProps) => {
  return (
    <div className="relative">
      <Image src={photoSrc} alt="avatar" width={88} height={88} className="aspect-square rounded-full object-cover" />
      {onRemove && (
        <button onClick={onRemove} className="absolute  cursor-pointer bottom-0 right-0 rounded-full p-1 hover:scale-115 transition ease-in-out duration-150">
          <Image src="/svgs/bin.svg" alt="remove avatar" width={24} height={24} />
        </button>
      )}
    </div>
  );
};

export default CircleAvatar;
