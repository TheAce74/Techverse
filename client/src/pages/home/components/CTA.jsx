import FormInput from "../../../components/form/FormInput";
import Button from "../../../components/ui/Button";

function CTA() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <section className="cta">
      <h2>Stay updated on every information concerning the conference</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          placeholder="Enter your email address"
          rounded="left"
          type="email"
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
