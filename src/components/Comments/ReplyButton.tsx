import { ReplyButtonProps } from '@/types/propTypes';
import Image from 'next/image';
import React from 'react';

const ReplyButton = ({onClick} : ReplyButtonProps) => {
    return (
        <div className='flex gap-3 items-center cursor-pointer' onClick={onClick}>
            <Image src='/svgs/reply.svg' alt='reply icon' width={16} height={16}/>
            <span className='text-[#8338EC] text-xs'>უპასუხე</span>
        </div>
    );
};

export default ReplyButton;