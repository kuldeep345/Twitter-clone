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


const Sidebar = () => {

    const { data: session } = useSession()

    const [modalOpen, setModalOpen] = useState(false)

    const handleClick = () => {
        setModalOpen(() => !modalOpen);
    };

    const handleClickAway = () => {
        setModalOpen(false);
    };

    return (
        <div className='hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full'>
            <div className="flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24">
                <Image src="https://rb.gy/ogau5a" width={30} height={30} alt="" priority />
            </div>
            <div className='space-y-2.5 mt-4 mb-2.5 xl:ml-24'>
                <SidebarLink text="Home" Icon={HomeIcon} active />
                <SidebarLink text="Explore" Icon={HashtagIcon} />
                <SidebarLink text="Notifications" Icon={BellIcon} />
                <SidebarLink text="Messages" Icon={InboxIcon} />
                <SidebarLink text="Bookmarks" Icon={BookmarkIcon} />
                <SidebarLink text="Lists" Icon={ClipboardDocumentListIcon} />
                <SidebarLink text="Profile" Icon={UserIcon} />
                <SidebarLink text="More" Icon={EllipsisHorizontalCircleIcon} />
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
                <EllipsisHorizontalIcon className='h-5 hidden xl:inline ml-10' />
            </div>
                    
                </div>
            </ClickAwayListener>
        </div>
    )
}

export default Sidebar



