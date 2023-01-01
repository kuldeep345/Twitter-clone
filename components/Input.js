import { ChartBarIcon, PhotoIcon, XMarkIcon, FaceSmileIcon, CalendarIcon } from '@heroicons/react/24/outline'
import Picker from '@emoji-mart/react'
import React, { useState, useRef } from 'react'
import { firebase, db } from '../firebase'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadString, getStorage } from 'firebase/storage'
import { useSession } from 'next-auth/react'

const Input = () => {

    const [input, setInput] = useState("")
    const [selectedFile, setSelectedFile] = useState(null)
    const [showEmoji, setShowEmoji] = useState(false)
    const [loading, setLoading] = useState(false)
    const imageRef = useRef()
    const storage = getStorage();

    const { data : session } = useSession()


    const sendPost = async () => {
        if (loading) return;
        setLoading(true)

        const docRef = await addDoc(collection(db, 'posts'), {
            id: session.user.uid,
            username: session.user.name,
            userImg: session.user.image,
            tag: session.user.tag,
            text: input,
            timestamp: serverTimestamp()
        })

        const imgRef = ref(storage, `posts/${docRef.id}/image`)

        if (selectedFile) {
            await uploadString(imgRef, selectedFile, "data_url").then(async () => {
                const downloadURL = await getDownloadURL(imgRef)
                await updateDoc(doc(db, "posts", docRef.id), {
                    image: downloadURL
                })
            })
        }

        setLoading(false)
        setInput("")
        setSelectedFile(null)
        setShowEmoji(false)
    }


    const addImageToPost = (e) => {
        const reader = new FileReader()
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }

        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result)
        }
    }

    const addEmoji = (e) => {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el))
        console.log(codesArray)
        let emoji = String.fromCodePoint(...codesArray);
        setInput(input + emoji)
    }


    return (
        <div className={`border-b border-gray-700 p-3 flex space-x-3 ${loading && "opacity-60"}`}>
            <img
                src='https://res.cloudinary.com/cdf/image/upload/v1670863191/projects/favicon_qfooxl.jpg'
                alt=''
                className='h-11 w-11 rounded-full cursor-pointer'
            />
            <div className='w-full divide-y divide-gray-700'>
                <div className={`${selectedFile && "pb-7"} ${input && "space-y-2.5"}`}>
                    <textarea
                        value={input}
                        rows="2"
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="What's happening?"
                        className='bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full in-h-[50px]'
                    />
                    {selectedFile && (<div className="relative">
                        <div className='absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer' onClick={() => setSelectedFile(null)}>
                            <XMarkIcon className="text-white h-5" />
                        </div>
                        <img
                            src={selectedFile}
                            alt=""
                            className="rounded-2xl max-h-80 object-contain"
                        />
                    </div>)}
                </div>

                {!loading && <div className="flex items-center justify-between pt-2.5">
                    <div className="flex items-center w-full">
                        <div className='flex flex-col w-full'>
                            <div className='flex justify-between w-full items-center'>
                                <div className='flex'>
                                    <div className='icon' onClick={() => imageRef.current.click()}>
                                        <PhotoIcon className='text-[#1d9bf0] h-[22px]' />
                                        <input ref={imageRef} type="file" onChange={addImageToPost} hidden />
                                    </div>

                                    <div className='icon rotate-90'>
                                        <ChartBarIcon className='text-[#1d9bf0] h-[22px]' />
                                    </div>
                                    <div className='icon' onClick={() => setShowEmoji(!showEmoji)}>
                                        <FaceSmileIcon className='text-[#1d9bf0] h-[22px]' />
                                    </div>
                                    <div className='icon'>
                                        <CalendarIcon className='text-[#1d9bf0] h-[22px]' />
                                    </div>

                                </div>

                                <button className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1aBcd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
                                    disabled={!input.trim() && !selectedFile}
                                    onClick={sendPost}
                                >Tweet</button>
                            </div>

                            {showEmoji && (
                                <Picker
                                    onEmojiSelect={addEmoji}
                                    style={{
                                        position: "absolute",
                                        marginTop: "465px",
                                        marginLeft: -40,
                                        maxWidth: "320px",
                                        borderRadius: "20px"
                                    }}
                                    theme="dark"
                                />
                            )}
                        </div>
                    </div>

                </div>}
            </div>
        </div>
    )
}

export default Input