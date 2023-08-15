import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import FormInput from "../../components/form/FormInput";
import Button from "../../components/ui/Button";
import { useAppContext } from "../../context/AppContext";
import { useRef } from "react";
import { fetchData } from "../../utils/fetchData";

function Contact() {
  const location = useLocation();
  const fullnameRef = useRef(null);
  const messageRef = useRef(null);
  const emailRef = useRef(null);

  const { user } = useAppContext();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData("contact", "post", {
      fullname: fullnameRef.current.value,
      email: emailRef.current.value,
      message: messageRef.current.value
    })
  };

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
