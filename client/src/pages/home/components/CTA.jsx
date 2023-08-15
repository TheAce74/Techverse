import { useRef } from "react";
import FormInput from "../../../components/form/FormInput";
import Button from "../../../components/ui/Button";
import { fetchData } from "../../../utils/fetchData";
import Swal from "sweetalert2";

function CTA() {
  const emailRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData("keepmeupdated", "post", {
      email: emailRef.current.value,
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

  return (
    <section className="cta">
      <h2>Stay updated on every information concerning the conference</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          placeholder="Enter your email address"
          rounded="left"
          type="email"
          ref={emailRef}
          required={true}
        />
        <Button type="submit" rounded={false} color="secondary">
          Keep me updated
        </Button>
      </form>
    </section>
  );
}
export default CTA;
