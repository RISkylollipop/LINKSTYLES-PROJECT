// Creating an Accordion of Single Selection
// It will Contain our FAQs(Favorites Asked questions and answer) to it

import React, { useState } from "react";
import { faqDatas } from "./data";
import styles from "./faqs.module.css";

export const Faqs = () => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <>
      <div className={styles.faqContainer}>
        <div className={styles.faqheading}>
          <h3>Frequently Asked questions</h3>
        </div>

        <div className={styles.faqCardContainer}>
          {faqDatas &&
            faqDatas?.map((faq) => (
              <div key={faq.id} className={styles.faqCard}>
                <h4 onClick={() => setSelectedId(faq.id)}>{faq.question}</h4>
                {selectedId === faq.id ? (
                  <div className={styles.faqCardBody}>
                    <h6>{faq.answer}</h6>
                  </div>
                ) : null}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
