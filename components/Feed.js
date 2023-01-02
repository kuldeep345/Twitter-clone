import { SparklesIcon } from '@heroicons/react/24/outline'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { ModeState } from '../atoms/modalAtom'
import { db } from '../firebase'
import Input from './Input'
import Post from './Post'

const Feed = () => {

  const [posts, setPosts] = useState([])
  const [isOn, setIsOn] = useRecoilState(ModeState);

  useEffect(
    () => onSnapshot(query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs)
      }
    ), [db])


  return (
    <div className='text-white flex-grow border-l border-r border-gray-700 max-w-2xl xl:ml-[370px] ml-[73px]'>
      <div className={` ${isOn ? 'text-black' : 'text-[#d9d9d9]'}  flex items-center sm:justify-between py-2 px-3 sticky top-0 z-50 ${isOn ? 'bg-white' : 'bg-black'} border-b border-gray-700 justify-between`}>
        <h2 className={`text-lg sm:text-xl font-bold `}>Home</h2>
        <div className='hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0'>
          <SparklesIcon className={`h-5 ml-auto  ${isOn ? 'text-black' : 'text-white'}`} />
        </div>
      </div>

      <Input />

      <div className='pb-72'>
        {posts.map((post) => (
          <Post key={post.id} id={post.id} post={post.data()}/>
        ))}
      </div>

    </div>
  )
}

export default Feed