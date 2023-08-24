import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import FormInput from "../../components/form/FormInput";
import Button from "../../components/ui/Button";
import { useAppContext } from "../../context/AppContext";
import { useEffect, useRef } from "react";
import { fetchData } from "../../utils/fetchData";
import Swal from "sweetalert2";

function Contact() {
  const location = useLocation();
  const fullnameRef = useRef(null);
  const messageRef = useRef(null);
  const emailRef = useRef(null);

  const { user, setLoader } = useAppContext();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData("contact", "post", {
      fullname: fullnameRef.current.value,
      email: emailRef.current.value,
      message: messageRef.current.value,
    }).then((data) => {
      if (data.message) {
        Swal.fire({
          title: "Success",
          text: "Message sent",
          icon: "success",
          confirmButtonText: "Continue",
          confirmButtonColor: "var(--clr-secondary-400)",
        }).then(() => {
          event.target.reset();
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
  };

  useEffect(() => {
    setLoader(false);
  }, []);

  return (
    <>
      {location.pathname && (
        <motion.section
          className="contact"
          key="contact"
          transition={{ duration: 0.5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <h1>
            Hello there, would you love to share your thoughts on anything with
            us? Please fill out the form below
          </h1>
          <form onSubmit={handleSubmit}>
            <FormInput
              placeholder="Full name"
              required={true}
              value={user ? user : null}
              ref={fullnameRef}
            />
            <FormInput
              placeholder="Email address"
              required={true}
              type="email"
              ref={emailRef}
            />
            <FormInput
              placeholder="Type your message here..."
              required={true}
              textarea={true}
              ref={messageRef}
            />
            <Button type="submit" color="secondary">
              Send message
            </Button>
          </form>
        </motion.section>
      )}
    </>
  );
}
export default Contact;
