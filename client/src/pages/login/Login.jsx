import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import FormInputHOC from "../../components/form/FormInputHOC";
import Button from "../../components/ui/Button";
import { IoMdMail } from "react-icons/io";
import { HiLockClosed } from "react-icons/hi";
import { useRef } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

function Login() {
  const location = useLocation();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { login } = useAuthentication();

  const handleSubmit = (event) => {
    event.preventDefault();
    login("login", "post", {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return (
    <>
      {location.pathname && (
        <motion.section
          className="login"
          key="login"
          transition={{ duration: 0.5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <h1>Welcome back! Please login to your profile</h1>
          <form onSubmit={handleSubmit}>
            <FormInputHOC
              placeholder="Email address"
              type="email"
              required={true}
              rounded="right"
              ref={emailRef}
              icon={() => <IoMdMail />}
            />
            <FormInputHOC
              placeholder="Password"
              type="password"
              required={true}
              rounded="right"
              ref={passwordRef}
              icon={() => <HiLockClosed />}
            />
            <Button type="submit" color="secondary">
              Login
            </Button>
            {/* <p>
              Forgot password?{" "}
              <Link to="/resetpassword">Reset your password</Link>
            </p> */}
            <p>
              Not registered? <Link to="/signup">Register now</Link>
            </p>
          </form>
        </motion.section>
      )}
    </>
  );
}
export default Login;
