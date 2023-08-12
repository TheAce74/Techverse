import Speaker from "./components/Speaker";
import { speakers } from "../../data/speakers";

function Speakers() {
  return (
    <section className="speakers">
      <h1>Get to know our amazing speakers</h1>
      {speakers.map(({ name, position, imgUrl, id, text, person }) => (
        <Speaker
          key={id}
          name={name}
          position={position}
          imgUrl={imgUrl}
          text={text}
          person={person}
        />
      ))}
    </section>
  );
}
export default Speakers;
