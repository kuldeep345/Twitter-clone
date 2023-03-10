import { modalState, ModeState } from "../atoms/modalAtom"
import TailModal from "../components/TailModal"
import Sidebar from "../components/Sidebar"
import { getProviders , getSession , useSession } from "next-auth/react"
import { useRecoilState } from "recoil"
import Head from "next/head"
import { useRouter } from "next/router"
import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import Post from '../components/Post'
import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import { db } from "../firebase"
import Login from "../components/Login"
import axios from "axios"
import Comment from "../components/Comment"

const PostPage = ({
    trendingResults,
    followResults,
    providers,
}) => {
    const router = useRouter()
    const { data : session } = useSession()
    const [ isOpen , setIsOpen] = useRecoilState(modalState)
    const [isOn, setIsOn] = useRecoilState(ModeState);
    const [post , setPost] = useState()
    const [comments, setComments] = useState([])

    const { id } = router.query;

    useEffect(
        () => onSnapshot(doc(db,"posts",id) ,(snapshot)=>{
            setPost(snapshot.data())
        }),
        [db]
    )

    useEffect(
        () => onSnapshot(query(
            collection(db,"posts",id,"comments"),
            orderBy("timestamp","desc")
            ),
            (snapshot) => setComments(snapshot.docs)
            )
        , [db,id])
    
          
    if(!session) return <Login providers={providers}/>

  return (
    <div>
        <Head>
            <title>{post?.username} on Twitter: &quot;{post?.text}&quot;</title>
            <link rel="icon" href="/favicon.io" />
        </Head>

        <main className={`${isOn ? 'bg-white' : 'bg-black'} min-h-screen flex max-w-[1500px] mx-auto`}>
            <Sidebar />
            <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
                <div className={`flex items-center px-1.5 py-2 border-b border-gray-700 ${isOn ? 'text-gray-700' : 'text-[#d9d9d9]'} font-semibold text-xl gap-x-4 sticky top-0 z-50 ${isOn ? 'bg-white' : 'bg-black'}`}>
                    <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0" onClick={()=>router.push("/")}>
                        <ArrowLeftIcon className={`h-5 text-white ${isOn ? 'text-black' : 'text-white'}`} />
                    </div>
                    Tweet
                </div>
                <Post  id={id} post={post} postPage/>
                {comments.length > 0 && (
                    <div className="pb-72">
                        {comments.map(comment => (
                            <Comment key={comment.id} id={comment.id} comment={comment.data()}/>
                        ))}
                    </div>
                )}
            </div>
            {isOpen && <TailModal/>}
        </main>

    </div>
  )
}

export default PostPage

export async function getServerSideProps(context) {
    const {data:trendingResults} = await axios.get("https://www.jsonkeeper.com/b/NKEV")
    const {data:followResults} = await axios.get("https://www.jsonkeeper.com/b/WWMJ")
  
    const providers = await getProviders()
    const session = await getSession(context)
  
    return {
      props:{
        trendingResults,
        followResults,
        providers,
        session
      }
    }
  }