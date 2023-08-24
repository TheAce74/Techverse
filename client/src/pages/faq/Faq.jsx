import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import Faq from "react-faq-component";
import { faqData } from "../../data/faq";
import { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";

function FAQ() {
  const location = useLocation();

  const { setLoader } = useAppContext();

  const config = {
    animate: true,
    expandIcon: "+",
    collapseIcon: "-",
    tabFocus: true,
  };

  const styles = {
    rowTitleColor: "var(--clr-neutral-100)",
    rowTitleTextSize: "1.1rem",
    rowContentColor: "var(--clr-neutral-100)",
    rowContentTextSize: "1.1rem",
    rowContentPaddingBottom: "1em",
    rowContentPaddingLeft: "1.5em",
    arrowColor: "var(--clr-neutral-100)",
  };

  useEffect(() => {
    setLoader(false);
  }, []);

  return (
    <>
      {location.pathname && (
        <motion.section
          className="faq"
          key="faq"
          transition={{ duration: 0.5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <h1>Frequently Asked Questions</h1>
          <Faq data={faqData} config={config} styles={styles} />
        </motion.section>
      )}
    </>
  );
}
export default FAQ;
