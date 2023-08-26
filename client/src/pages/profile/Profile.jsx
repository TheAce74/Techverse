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
      <div className="wrapper">
        <div>
          <div className="user">
            <span aria-hidden="true" data-color={user.color}>
              <span aria-hidden="true">{user.username[0]?.toUpperCase()}</span>
            </span>
          </div>
          <h2>
            <span>
              Hello, <b>{user.username.slice(0, user.username.indexOf(" "))}</b>
            </span>
            <span>Welcome to your profile</span>
          </h2>
        </div>
        <h1>Your personal information</h1>
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
            <h3>You&apos;ve not secured your spot yet?</h3>
            <Link to="/payment">
              <Button color="secondary">Purchase ticket</Button>
            </Link>
          </div>
        )}
      </div>
    </motion.section>
  );
}
export default Profile;
