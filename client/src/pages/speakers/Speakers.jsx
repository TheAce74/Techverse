import Speaker from "./components/Speaker";
import { speakers } from "../../data/speakers";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

function Speakers() {
  const location = useLocation();

  return (
    <>
      {location.pathname && (
        <motion.section
          className="speakers"
          key="speakers"
          transition={{ duration: 0.5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
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
        </motion.section>
      )}
    </>
  );
}
export default Speakers;
