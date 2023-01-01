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
                    className="text-[#d9d9d9] bg-[#272C30] flex items-center justify-center hoverAnimation rounded-xl shadow-xl absolute lg:inline bottom-[60px] right-[-144px] h-[53px] w-[205px] p-[16px] lg:right-0 lg:bottom-20 "
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