import { useRef } from "react";
import FormInput from "../../../components/form/FormInput";
import Button from "../../../components/ui/Button";
import { fetchData } from "../../../utils/fetchData";

function CTA() {
  const emailRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData("keepmeupdated", "post", {
      email: emailRef.current.value,
    }).then(data => {
      console.log(data);
      if (data.status === "success") {
       // success alert
      } else {
        // throw error
      }

    });
    event.target.reset();
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
