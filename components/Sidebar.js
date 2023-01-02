import Image from 'next/image'
import React, { useState } from 'react'
import SidebarLink from './SidebarLink'
import ClickAwayListener from '@mui/base/ClickAwayListener';
import {
    HomeIcon,
    HashtagIcon,
    BellIcon,
    InboxIcon,
    BookmarkIcon,
    ClipboardDocumentListIcon,
    UserIcon,
    EllipsisHorizontalCircleIcon,
    EllipsisHorizontalIcon
} from '@heroicons/react/24/outline/'
import { useSession } from 'next-auth/react'
import { AnimatePresence } from 'framer-motion'
import Modal from './Modal'
import { motion } from "framer-motion";
import { useRecoilState } from 'recoil';
import { ModeState } from '../atoms/modalAtom';
import Link from 'next/link';


const Sidebar = () => {

    const { data: session } = useSession()

    const [modalOpen, setModalOpen] = useState(false)
    const [isOn, setIsOn] = useRecoilState(ModeState);

    const toggleSwitch = () => setIsOn(!isOn);

    const handleClick = () => {
        setModalOpen(() => !modalOpen);
    };

    const handleClickAway = () => {
        setModalOpen(false);
    };

    const spring = {
        type: "spring",
        stiffness: 700,
        damping: 30
    };


    return (
        <div className='flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full'>
            <div className="flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24">
                <Link href="/"> {isOn ? <Image src="/twitter.png" width={30} height={30} className="h-[3rem] w-[2.8rem]" alt="" priority />
                    : <Image src="https://rb.gy/ogau5a" width={34} height={34} className="pt-2" alt="" priority />}</Link>
            </div>
            <div className='space-y-2.5 mt-4 mb-2.5 xl:ml-24'>
                <Link href="/"><SidebarLink text="Home" Icon={HomeIcon} active /></Link>
                <SidebarLink text="Explore" Icon={HashtagIcon} />
                <SidebarLink text="Notifications" Icon={BellIcon} />
                <SidebarLink text="Messages" Icon={InboxIcon} />
                <SidebarLink text="Bookmarks" Icon={BookmarkIcon} />
                <SidebarLink text="Lists" Icon={ClipboardDocumentListIcon} />
                <SidebarLink text="Profile" Icon={UserIcon} />
                <SidebarLink text="More" Icon={EllipsisHorizontalCircleIcon} />
                <div className={`xl:hidden w-[32px] h-[60px] relative mx-auto ${isOn ? 'bg-black' : 'bg-white'} flex flex-col ${isOn ? 'justify-end' : 'justify-start'} rounded-full cursor-pointer`} data-isOn={isOn} onClick={toggleSwitch}>
                    <span className={`absolute top-[1px] left-[3px] font-bold ${isOn ? 'text-white' : 'text-black'}`}>off</span>
                    <motion.div className={`w-[28px] mx-auto h-[28px] z-50 ${isOn ? 'bg-white' : 'bg-black'} rounded-full`} layout transition={spring} />
                    <span className={`absolute bottom-[3px] left-[6px] font-bold ${isOn ? ' text-white' : 'text-black'}`}>on</span>
                </div>

                  <div className={`hidden w-[68px] h-[39px] relative ml-4 mb-4 px-1 py-1 ${isOn ? 'bg-black' : 'bg-white'} xl:flex  ${isOn ? 'justify-end' : 'justify-start'} rounded-full cursor-pointer`} data-isOn={isOn} onClick={toggleSwitch}>
                    <span className={`absolute text-md top-[6px] left-[4px] font-bold ${isOn ? 'text-white' : 'text-black'}`}>off</span>
                    <motion.div className={`w-[32px] h-[32px] my-auto z-50 ${isOn ? 'bg-white' : 'bg-black'} rounded-full`} layout transition={spring} />
                    <span className={`absolute text-md top-[6px] right-[6px] font-bold ${isOn ? ' text-white' : 'text-black'}`}>on</span>
                </div>
            </div>
            <button className='hidden xl:inline ml-auto bg-[#1d9bf0] text-white rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-[#1a8cd8] '>Tweet
            </button>

            <ClickAwayListener onClickAway={handleClickAway}>
                <div className={`mt-auto xl:ml-auto xl:-mr-5`}>

                    <div className='flex items-center justify-center xl:ml-auto mr-3 mt-auto ' onClick={handleClick}>
                        <AnimatePresence>
                            {modalOpen && (
                                <Modal handleClose={() => setModalOpen(false)} />
                            )}
                        </AnimatePresence>
                    </div>

                    <div className={`text-[#d9d9d9] flex items-center justify-center hoverAnimation xl:ml-auto xl:-mr-5 `} onClick={handleClick} >
                        <img
                            src={session?.user.image}
                            alt=""
                            className='h-10 w-10 rounded-full xl:mr-2.5'
                        />
                        <div className='hidden xl:inline leading-5'>
                            <h4 className='font-bold'>{session?.user.name}</h4>
                            <p className='text-[#6e7]'>@{session?.user.tag}</p>
                        </div>
                        <EllipsisHorizontalIcon className={`h-5 hidden xl:inline ml-10 ${isOn ? 'text-black' : 'text-white '}`} />
                    </div>

                </div>
            </ClickAwayListener>
        </div>
    )
}

export default Sidebar



