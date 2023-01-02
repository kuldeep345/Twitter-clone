import Head from 'next/head'
import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import { useSession , getProviders, getSession } from 'next-auth/react'
import Login from '../components/Login'
import axios from 'axios'
import TailModal from '../components/TailModal'
import { useRecoilState } from 'recoil'
import { modalState, ModeState } from '../atoms/modalAtom'
import Widgets from '../components/Widgets'

export default function Home({
  trendingResults,
  followResults,
  providers,
}) {

  const { data:session } = useSession()
  const [isOpen , setIsOpen] = useRecoilState(modalState)
  const [isOn, setIsOn] = useRecoilState(ModeState);

  if(!session) return <Login providers={providers}/>

   return (
    <div>
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${isOn ? 'bg-white' : 'bg-black'} w-[100vw]`}>     
      <main className={`${isOn ? 'bg-white' : 'bg-black'} min-h-screen flex max-w-[1500px] mx-auto`}>
        <Sidebar />
        <Feed/>
        <Widgets trendingResults={trendingResults} followResults={followResults}/>
        {isOpen && <TailModal/>}
      </main>
      </div>
    </div>
  )
}


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