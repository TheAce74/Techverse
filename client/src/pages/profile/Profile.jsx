import { motion } from "framer-motion";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Profile() {
  const { user, setLoader } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    setLoader(false);
  });

  return (
    <motion.section
      className="profile"
      key="profile"
      transition={{ duration: 0.5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h1>Profile</h1>
    </motion.section>
  );
}
export default Profile;
