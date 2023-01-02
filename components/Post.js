import React, { useEffect, useState } from 'react'
import { EllipsisHorizontalIcon, TrashIcon, ArrowsRightLeftIcon, HeartIcon, ShareIcon, ChartBarIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline'
import SolidHeartIcon from '@heroicons/react/24/solid/HeartIcon'
import { useSession } from 'next-auth/react'
import Moment from 'react-moment';
import { useRecoilState } from 'recoil';
import { modalState, ModeState, postIdState } from '../atoms/modalAtom';
import { useRouter } from 'next/router';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Post = ({ id, post, postPage }) => {
    const router = useRouter()

    const { data: session } = useSession()
    const [isOpen , setIsOpen] = useRecoilState(modalState)
    const [postId, setPostId] = useRecoilState(postIdState);
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const [liked, setLiked] = useState(false);
    const [isOn, setIsOn] = useRecoilState(ModeState);

    useEffect(
        () => onSnapshot(
            query(collection(db,"posts", id , "comments") , orderBy("timestamp" , "desc")),
            (snapShot) => {
                setComments(snapShot.docs)
            }
        )
        , [db , id])
    

    useEffect(
        () => onSnapshot(collection(db, "posts" , id , "likes") , (snapShot) => setLikes(snapShot.docs) )  
        , [db , id]
    )
    
    useEffect(
        () => setLiked(likes.findIndex((like) => like.id === session?.user?.uid ) !== -1 ) 
     , [likes])
    
    const likePost = async() => {
        if(liked){
            await deleteDoc(doc(db,"posts",id,"likes",session.user.uid))
        }
        else{
            setDoc(doc(db,"posts",id,"likes",session.user.uid) , {
                username:session.user.name
            })
        }
    }

    return (
        <div className='p-3 flex cursor-pointer border-b border-gray-700' 
        onClick={()=>router.push(`/${id}`)}
        >
            {!postPage && (
                <img src={post?.userImg} alt="" className='h-11 w-11 rounded-full mr-4' />
            )}
            <div className='flex flex-col space-y-2 w-full'>
                <div className={`flex flex-col ${!postPage && "justify-between"}`}>
                   
                    <div className={`${isOn ? 'text-gray-600' : 'text-[#6e767d' } flex items-end`}>
                    {postPage && (
                        <img
                            src={post?.userImg}
                            alt=""
                            className="h-11 w-11 rounded-full mr-4"
                        />
                    )}
                        <div className='inline-block group'>
                            <h4 className={`font-bold text-[15px] sm:text-base ${isOn ? 'text-black' : 'text-[#6e767d' }group-hover:underline ${!postPage && "inline-block"}`}>{post?.username}</h4>
                            <span className={`text-sm sm:text-[15px] ${!postPage && "ml-1.5"}`}>@{post?.tag}</span>
                        </div>{" "}
                        <span className='hover:underline text-sm sm:text-[15px] ml-3 mb-0.5'>
                            <Moment fromNow >{post?.timestamp?.toDate()}</Moment>
                        </span>
                        {/* {!postPage && (<p className='text-[#d9d9d9] text-[15px] sm:text-base mt-0.5'>{post?.text}</p>)} */}
                           <div className='icon group flex-shrink-0 ml-auto'>
                        <EllipsisHorizontalIcon className={`h-5 ${isOn ? 'text-gray-600' : 'text-[#1d9bf0]'} `}/>
                    </div>
                    </div>
                 
               
                        <p className={`${isOn ? 'text-gray-700' : 'text-[#d9d9d9] '}  text-[15px] py-3 sm:text-base mt-0.5`}>{post?.text}</p>
                  
                    <img src={post?.image} alt="" className={`${postPage ? "rounded-md" : "rounded-2xl"} max-h-[700px] object-cover mr-2`} />
                    <div className={`text-[#6e767d] flex justify-between w-[10/12] ${postPage && 'px-10'}`}>
                        <div className='flex items-center space-x-1 group pt-3'
                            onClick={(e) => {
                                e.stopPropagation();
                                setPostId(id);
                                setIsOpen(true)
                            }}
                        >
                            <div className='icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10'>
                                <ChatBubbleOvalLeftEllipsisIcon className="h-5 group-hover:text-[#1d9bf0]" />
                            </div>
                            {comments.length > 0 && (
                                <span className='group-hover:text-[#1d9bf0] text-sm'>
                                    {comments.length}
                                </span>
                            )}
                        </div>

                        {session.user.uid === post?.id ? (
                            <div
                                className="flex items-center space-x-1 group pt-3"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteDoc(doc(db, "posts", id));
                                    router.push("/");
                                }}
                            >
                                <div className="icon group-hover:bg-red-600/10">
                                    <TrashIcon className="h-5 group-hover:text-red-600" />
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-1 group pt-3">
                                <div className="icon group-hover:bg-green-500/10">
                                    <ArrowsRightLeftIcon className="h-5 group-hover:text-green-500" />
                                </div>
                            </div>
                        )}

                        <div
                            className="flex items-center space-x-1 group pt-3"
                            onClick={(e) => {
                                e.stopPropagation();
                                likePost();
                              }}
                        >
                            <div className="icon group-hover:bg-pink-600/10">
                                {liked ? (
                                    <SolidHeartIcon className="h-5 text-pink-600" />
                                ) : (
                                    <HeartIcon className="h-5 group-hover:text-pink-600" />
                                )}
                            </div>
                            {likes.length > 0 && (
                                <span
                                    className={`group-hover:text-pink-600 text-sm ${liked && "text-pink-600"
                                        }`}
                                >
                                    {likes.length}
                                </span>
                            )}
                        </div>

                        <div className="icon group pt-3">
                            <ShareIcon className="h-5 group-hover:text-[#1d9bf0]" />
                        </div>
                        <div className="icon group pt-3">
                            <ChartBarIcon className="h-5 group-hover:text-[#1d9bf0]" />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post