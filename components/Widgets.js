import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import React from 'react'
import { useRecoilState } from 'recoil'
import { ModeState } from '../atoms/modalAtom'
import Trending from './Trending'

const Widgets = ({
    trendingResults,
    followResults,
}) => {

    const [isOn, setIsOn] = useRecoilState(ModeState);

  return (
    <div className='hidden lg:inline ml-8 xl:w-[450px] py-1 space-y-5'>
        <div className={`sticky top-0 py-1.5 ${isOn ? 'bg-white' : 'bg-black'} z-50 w-11/12 xl:w-9/12`}>

        <div className={`flex items-center ${isOn ? 'bg-gray-100' :'bg-[#202327]'} p-3 rounded-full relative`}>
        <MagnifyingGlassIcon className={`${isOn ? 'text-gray-800' : 'text-gray-500 '} h-5 z-50`}/>
            <input type="text" className={`bg-transparent placeholder-gray-500 outline-none ${isOn ? 'text-gray-600' : 'text-[#d9d9d9]'} absolute inset-0 pl-11 border border-transparent w-full focus:border-[#1d9bf0] rounded-full focus:g-black focus:shadow-lg`}
            placeholder='Search Twitter'
            />
        </div>          
        </div>
        <div className={`${isOn ? 'text-black' : 'text-[#d9d9d9] '} space-y-3 ${isOn ? 'bg-gray-100' : 'bg-[#15181c]'} pt-2 rounded-xl w-11/12 xl:w-9/12`}>
        <h4 className='font-bold text-xl px-4'>
            What&apos;s happening
        </h4>
        {trendingResults.map((result,index) => (
            <Trending key={index} result={result}/>
        ))}
        <button className='hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-[#1d9bf0] font-light'>
            Show more
        </button>
        </div>
        <div className={`${isOn ? 'text-gray-600' : 'text-[#d9d9d9]'} space-y-3 ${isOn ? 'bg-gray-100' : 'bg-[#15181c]'} pt-2 rounded-xl w-11/12 xl:w-9/12`}>
        <h4 className='font-bold text-xl px-4'>
            Who to follow
        </h4>
        {followResults.map((result,index) => (
           <div key={index} className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center ">
            <Image
            width={50} 
            height={50}
            src={result.userImg}
            className="w-14 h-14 rounded-full"
            style={{objectFit:"cover"}}
            />
            <div className='ml-4 leading-5 group'>
                <h4 className='font-bold group-hover:underline'>
                    {result.username}
                </h4>
                <h5 className='text-gray-500 text-[15px]'>{result.tag}</h5>
            </div>
            <button className={`ml-auto ${isOn ? 'bg-black' : 'bg-white'} ${isOn ? 'text-white' : 'text-black'} rounded-full font-bold text-sm py-1.5 px-3.5`}>
                Follow
            </button>
           </div>
        ))}
        <button className={`hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full ${isOn ? 'text-[#0182d9]' : 'text-[#1d9bf0]'} font-normal`}>
            Show more
        </button>
        </div>
    </div>
  )
}

export default Widgets