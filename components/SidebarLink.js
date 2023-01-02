import React from 'react'
import { useRecoilState } from 'recoil'
import {  ModeState } from '../atoms/modalAtom'

const SidebarLink = ({Icon , text , active}) => {

  const [isOn, setIsOn] = useRecoilState(ModeState);

  return (
    <div className={`${isOn ? 'text-black' : 'text-[#d9d9d9]'} flex items-center justify-center xl:justify-start text-xl space-x-3 hoverAnimation ${active && "font-bold"}`}>
        <Icon className="h-7"/>
        <span className="hidden xl:inline">{text}</span>
    </div>
  )
}

export default SidebarLink