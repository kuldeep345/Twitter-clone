import { motion } from "framer-motion";

const Backdrop = ({ children , onClick}) => {
 
  return (
    <motion.div
    className="backdrop z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;