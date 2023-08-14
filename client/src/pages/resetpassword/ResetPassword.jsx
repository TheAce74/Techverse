import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

function ResetPassword() {
  const location = useLocation();

  return (
    <>
      {location.pathname && (
        <motion.section
          className="resetpassword"
          key="resetpassword"
          transition={{ duration: 0.5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <h1>Reset Password</h1>
        </motion.section>
      )}
    </>
  );
}
export default ResetPassword;
