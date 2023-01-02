import { motion } from 'framer-motion'
import Backdrop from './Backdrop.js'
import { useSession , signOut} from 'next-auth/react'

  const gifYouUp = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
    exit: {
      opacity: 0,
      scale: 0,
      transition: {
        duration: 0.15,
        ease: "easeOut",
      },
    },
  };
  



const Modal = ({ handleClose  }) => {

    const { data: session } = useSession();

    return (
        <Backdrop>
                <motion.div
                    onClick={(e) =>{
                         e.stopPropagation()
                        signOut()
                        }}
                    className="text-[#d9d9d9] bg-[#272C30] z-50 flex items-center justify-center cursor-pointer hover:bg-gray-800 rounded-xl shadow-xl absolute lg:inline bottom-[50px] right-[-144px] h-[53px] w-[205px] p-[16px] md:right-30 md:bottom-8 lg:bottom-12"
                    variants={gifYouUp}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                   <p className='text-[#6e7]'>Log out @{session.user.tag}</p>
                </motion.div>
        
        </Backdrop>
    )
}

export default Modal