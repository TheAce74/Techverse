import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

function Faq() {
  const location = useLocation();

  return (
    <>
      {location.pathname && (
        <motion.section
          className="faq"
          key="faq"
          transition={{ duration: 0.5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <h1>FAQ</h1>
        </motion.section>
      )}
    </>
  );
}
export default Faq;
