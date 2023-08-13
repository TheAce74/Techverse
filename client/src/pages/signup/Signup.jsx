import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

function Signup() {
  const location = useLocation();

  return (
    <>
      {location.pathname && (
        <motion.section
          className="signup"
          key="signup"
          transition={{ duration: 0.5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <h1>Signup</h1>
        </motion.section>
      )}
    </>
  );
}
export default Signup;
