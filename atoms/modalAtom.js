import { useState } from "react";
import { atom } from "recoil";

export const modalState = atom({
    key:"modalState",
    default:false
})

export const postIdState = atom({
    key:"postIdState",
    default:""
})

export const ModeState = atom({
    key:"modeState",
    default:"true"
})

