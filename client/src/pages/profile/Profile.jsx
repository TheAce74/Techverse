import { motion } from "framer-motion";
import { useAppContext } from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Button from "../../components/ui/Button";
import { useAuthentication } from "../../hooks/useAuthentication";

function Profile() {
  const { user, setLoader } = useAppContext();
  const { logout } = useAuthentication();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.username) {
      navigate("/login");
    }
    setLoader(false);
  }, []);

  return (
    <motion.section
      className="profile"
      key="profile"
      transition={{ duration: 0.5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div>
        <div className="user">
          <span aria-hidden="true" data-color={user.color}>
            <span aria-hidden="true">{user.username[0]?.toUpperCase()}</span>
          </span>
        </div>
        <h1>
          <span>
            Hello, {user.username.slice(0, user.username.indexOf(" "))}
          </span>
          <span>Welcome to your profile</span>
        </h1>
      </div>
      <h2>Your personal information</h2>
      <h3>Firstname</h3>
      <p>{user.username.slice(0, user.username.indexOf(" "))}</p>
      <h3>Lastname</h3>
      <p>{user.username.slice(user.username.indexOf(" ") + 1)}</p>
      <h3>Email address</h3>
      <p>{user.email}</p>
      <Button color="secondary" handleLogout={logout}>
        Log out
      </Button>
      {user?.ticket_id ? (
        <div>
          <h4>Ticket details</h4>
          <p>Ticket type - {user.ticket_type}</p>
          <p>Ticket ID - {user.ticket_id}</p>
          <p>Seat number - {user.seat_number}</p>
        </div>
      ) : (
        <div>
          <p>You&apos;ve not secured your spot yet?</p>
          <Link to="/payment">
            <Button color="secondary">Purchase ticket</Button>
          </Link>
        </div>
      )}
    </motion.section>
  );
}
export default Profile;
