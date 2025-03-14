import { LabelProps } from '@/types/propTypes';
import Image from 'next/image';

const Label = ({title, htmlFor}:LabelProps) => {
    return (
        <label htmlFor={htmlFor} className="relative flex w-fit text-[14px] font-medium text-[#343A40]">
            <Image src="/svgs/star.svg" alt="required" width={8} height={8} className="absolute top-[1.2px] right-[-6px]" />
            {title}
          </label>
    );
};

export default Label;