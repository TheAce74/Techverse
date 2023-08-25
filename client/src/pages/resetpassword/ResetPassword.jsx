import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";

function ResetPassword() {
  const location = useLocation();

  const { user, setLoader } = useAppContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.username) {
      navigate("/profile");
    }
    setLoader(false);
  }, []);

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
