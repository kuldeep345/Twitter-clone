import { ChartBarIcon, ChatBubbleOvalLeftEllipsisIcon, EllipsisHorizontalIcon, HeartIcon, ShareIcon } from '@heroicons/react/24/outline'
import React from 'react'
import Moment from 'react-moment'
import { useRecoilState } from 'recoil';
import { ModeState } from '../atoms/modalAtom';

const Comment = ({id ,comment}) => {
    
    const [isOn, setIsOn] = useRecoilState(ModeState);

  return (
    <div className='p-3 flex cursor-pointer border-b border-gray-700'>
        <img 
        src={comment?.userImg}
        alt=""
        className="h-11 w-11 rounded-full mr-4"
        />
        <div className="flex flex-col space-y-2 w-full overflow-hidden">
            <div className="flex justify-between">
                <div className='text-[#6e767d]'>
                    <div className='inline-block group'>
                    <h4 className={`font-bold text-[15px] sm:text-base ${isOn ? 'text-black' : 'text-[#6e767d' } group-hover:underline `}>{comment?.username}</h4>
                <span className='ml-1.5 text-sm sm:text-[15px]'>
                    @{comment?.tag}{" "}
                </span>
                    </div>{" "}
                    <span className='hover:underline text-sm sm:text-[15px] text-[#6e767d] ml-3'>
                <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
                </span>

                </div>{""}
               
                <div className='icon group flex-shrink-0'>
            <EllipsisHorizontalIcon className={`h-5 ${isOn ? 'text-gray-800' : 'text-[#6e767d]'} group-hover:text-[#1d9bf0]`}/>
        </div>
              
            </div>
            <p className={`${isOn ? 'text-gray-700' : 'text-[#d9d9d9]'} mt-0.5 max-w-lg overflow-scroll no-scrollbar text-[15px] sm:text-base`}>
                    {comment?.comment}
                </p>
        
    <div className="flex w-full pr-4 justify-between mt-2">
        <div className='text-[#6e767d] flex justify-between'>
            <div className="icon group">
                <ChatBubbleOvalLeftEllipsisIcon className='h-5'/>
            </div>
        </div>

       
        <div className="flex items-center space-x-1 group">
            <div className="icon group-hover:bg-pink-600/10">
                <HeartIcon className='h-5 text-[#6e767d] group-hover:text-pink-600'/>
            </div>
            <span className='group-hover:text-pink-600 text-sm'></span>
        </div>

        <div className="icon group">
            <ShareIcon  className='h-5 text-[#6e767d] group-hover:text-[#1d9bf0]'/>
        </div>
        <div className="icon group">
            <ChartBarIcon  className='h-5 text-[#6e767d] group-hover:text-[#1d9bf0]'/>
        </div>

        </div>
        </div>
    </div>
  )
}

export default Comment