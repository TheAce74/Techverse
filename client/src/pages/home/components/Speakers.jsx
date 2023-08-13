import Speaker from "./Speaker";
import { speakers } from "../../../data/speakersHome";

function Speakers() {
  return (
    <section className="speakers--home">
      <h2>Meet Our Esteemed Organizers/Speakers</h2>
      <div className="speaker--home">
        {speakers.map(({ name, position, imgUrl, id, speakerUrl }) => (
          <Speaker
            key={id}
            name={name}
            position={position}
            imgUrl={imgUrl}
            speakerUrl={speakerUrl}
          />
        ))}
      </div>
    </section>
  );
}
export default Speakers;
