import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import FormInputHOC from "../../components/form/FormInputHOC";
import FormInput from "../../components/form/FormInput";
import Button from "../../components/ui/Button";
import { BiSolidUser } from "react-icons/bi";
import { IoMdMail } from "react-icons/io";
import { HiLockClosed } from "react-icons/hi";
import { useRef } from "react";
import Swal from "sweetalert2";
import { useAuthentication } from "../../hooks/useAuthentication";

function Signup() {
  const location = useLocation();
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const password1Ref = useRef(null);
  const password2Ref = useRef(null);
  const { signup } = useAuthentication();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password1Ref.current.value.length < 8) {
      Swal.fire({
        title: "Error!",
        text: "Password too short",
        icon: "error",
        confirmButtonText: "Password must be at least 8 characters",
        confirmButtonColor: "var(--clr-secondary-400)",
      });
    } else if (password1Ref.current.value !== password2Ref.current.value) {
      Swal.fire({
        title: "Error!",
        text: "Password Mismatch",
        icon: "error",
        confirmButtonText: "Check passwords and try again",
        confirmButtonColor: "var(--clr-secondary-400)",
      });
    } else {
      signup("register", "post", {
        username: `${firstNameRef.current.value} ${lastNameRef.current.value}`,
        email: emailRef.current.value,
        password: password1Ref.current.value,
      });
    }
  };

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
          <h1>
            Yahhh! we&apos;re glad to have you onboard, Please complete your
            registration
          </h1>
          <form onSubmit={handleSubmit}>
            <FormInputHOC
              placeholder="First name"
              required={true}
              rounded="right"
              icon={() => <BiSolidUser />}
              ref={firstNameRef}
            />
            <FormInputHOC
              placeholder="Last name"
              required={true}
              rounded="right"
              icon={() => <BiSolidUser />}
              ref={lastNameRef}
            />
            <FormInputHOC
              placeholder="Email address"
              type="email"
              required={true}
              rounded="right"
              icon={() => <IoMdMail />}
              ref={emailRef}
            />
            <FormInputHOC
              placeholder="Password"
              type="password"
              required={true}
              rounded="right"
              icon={() => <HiLockClosed />}
              ref={password1Ref}
            />
            <FormInputHOC
              placeholder="Confirm password"
              type="password"
              required={true}
              rounded="right"
              icon={() => <HiLockClosed />}
              ref={password2Ref}
            />
            <div className="policy">
              <FormInput type="checkbox" id="policy" required={true} />
              <label htmlFor="policy">
                I agree to the <span>terms</span> and <span>conditions</span>
              </label>
            </div>
            <Button type="submit" color="secondary">
              Continue
            </Button>
            <p>
              Already registered? <Link to="/login">Login</Link> to your profile
            </p>
          </form>
        </motion.section>
      )}
    </>
  );
}
export default Signup;
