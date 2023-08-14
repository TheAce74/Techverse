import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import FormInputHOC from "../../components/form/FormInputHOC";
import FormInput from "../../components/form/FormInput";
import Button from "../../components/ui/Button";
import { BiSolidUser } from "react-icons/bi";
import { IoMdMail } from "react-icons/io";
import { HiLockClosed } from "react-icons/hi";

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
          <h1>
            Yahhh! we&apos;re glad to have you onboard, Please complete your
            registration
          </h1>
          <form>
            <FormInputHOC
              placeholder="First name"
              required={true}
              rounded="right"
              icon={() => <BiSolidUser />}
            />
            <FormInputHOC
              placeholder="Last name"
              required={true}
              rounded="right"
              icon={() => <BiSolidUser />}
            />
            <FormInputHOC
              placeholder="Email address"
              type="email"
              required={true}
              rounded="right"
              icon={() => <IoMdMail />}
            />
            <FormInputHOC
              placeholder="Password"
              type="password"
              required={true}
              rounded="right"
              icon={() => <HiLockClosed />}
            />
            <FormInputHOC
              placeholder="Confirm password"
              type="password"
              required={true}
              rounded="right"
              icon={() => <HiLockClosed />}
            />
            <div>
              <FormInput type="checkbox" id="policy" />
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
