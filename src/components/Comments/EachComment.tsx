import { EachCommentProps } from '@/types/propTypes';
import React from 'react';
import CircleAvatar from '../CustomForm/CircleAvatar';
import ReplyButton from './ReplyButton';

const EachComment = ({comment, isChildComment=false}:EachCommentProps) => {
    return (
        <div className='flex gap-3 items-start'>
            <CircleAvatar photoSrc={comment.author_avatar} size={38}/>
            <div className='flex flex-col gap-5'>
                <h3 className='leading-none font-medium text-lg text-c-grey self-start'>{comment.author_nickname}</h3>
                <p className='text-[#343A40] font-light'>{comment.text} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro molestias vel repellendus sed numquam officiis dolorem nemo tempore a, facere illo dolores consequatur. Velit, nesciunt magni. Optio nisi modi nesciunt.</p>
                {!isChildComment && <ReplyButton/>}
                
            </div>

            
        </div>
    );
};

export default EachComment;