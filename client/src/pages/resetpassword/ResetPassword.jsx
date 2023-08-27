import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useAppContext } from "../../context/AppContext";
import FormInputHOC from "../../components/form/FormInputHOC";
import Swal from "sweetalert2";
import { IoMdMail } from "react-icons/io";
import { HiLockClosed } from "react-icons/hi";
import Button from "../../components/ui/Button";
import { fetchData } from "../../utils/fetchData";

function ResetPassword() {
  const location = useLocation();

  const { user, setLoader } = useAppContext();

  const navigate = useNavigate();

  const emailRef = useRef(null);
  const oldPasswordRef = useRef(null);
  const password1Ref = useRef(null);
  const password2Ref = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password1Ref.current.value.length < 8) {
      Swal.fire({
        title: "Error!",
        text: "New password too short",
        icon: "error",
        confirmButtonText: "Password must be at least 8 characters",
        confirmButtonColor: "var(--clr-secondary-400)",
      });
    } else if (password1Ref.current.value !== password2Ref.current.value) {
      Swal.fire({
        title: "Error!",
        text: "Password Mismatch",
        icon: "error",
        confirmButtonText: "Check new passwords and try again",
        confirmButtonColor: "var(--clr-secondary-400)",
      });
    } else if (oldPasswordRef.current.value === password1Ref.current.value) {
      Swal.fire({
        title: "Error!",
        text: "Password Unchanged",
        icon: "error",
        confirmButtonText: "New and old passwords are the same",
        confirmButtonColor: "var(--clr-secondary-400)",
      });
    } else {
      fetchData("forgotpassword", "post", {
        email: emailRef.current.value,
        password: password1Ref.current.value,
      }).then((data) => {
        if (data.message) {
          Swal.fire({
            title: "Success",
            text: data.message,
            icon: "success",
            confirmButtonText: "Continue",
            confirmButtonColor: "var(--clr-secondary-400)",
          }).then(() => {
            event.target.reset();
            navigate("/login");
          });
        } else {
          Swal.fire({
            title: "Error",
            text: data.error,
            icon: "error",
            confirmButtonText: "Try again",
            confirmButtonColor: "var(--clr-secondary-400)",
          });
        }
      });
      Swal.fire({
        title: "Info",
        text: "Please wait a moment...",
        icon: "info",
        showConfirmButton: false,
      });
    }
  };

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
          <form onSubmit={handleSubmit}>
            <FormInputHOC
              placeholder="Email address"
              type="email"
              required={true}
              rounded="right"
              icon={() => <IoMdMail />}
              ref={emailRef}
            />
            <FormInputHOC
              placeholder="Enter old password"
              type="password"
              required={true}
              rounded="right"
              icon={() => <HiLockClosed />}
              ref={oldPasswordRef}
            />
            <FormInputHOC
              placeholder="Enter new password"
              type="password"
              required={true}
              rounded="right"
              icon={() => <HiLockClosed />}
              ref={password1Ref}
            />
            <FormInputHOC
              placeholder="Confirm new password"
              type="password"
              required={true}
              rounded="right"
              icon={() => <HiLockClosed />}
              ref={password2Ref}
            />
            <Button type="submit" color="secondary">
              Reset password
            </Button>
            <p>
              Don&apos;t want to change your password?{" "}
              <Link to="/login">Login</Link> to your profile
            </p>
          </form>
        </motion.section>
      )}
    </>
  );
}
export default ResetPassword;
