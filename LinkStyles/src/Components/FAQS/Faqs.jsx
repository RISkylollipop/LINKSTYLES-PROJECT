// Creating an Accordion of Single Selection 
// It will Contain our FAQs(Favorites Asked Questions and Answer) to it
// Then we will create Double Selection For it 

import React, { useState } from 'react'
import { faqData } from './data'
import styles from './Faqs.module.css'


export const Faqs = () => {

    const [selected, setSelected] = useState();
    const [multipleSelection, setMultipleSelection] = useState(false)
    const [multiple, setMultiple] = useState([])

    function HandleSingleSelection(selectedId) {
        setSelected(selectedId === selected ? null : selectedId)
    }

    function HandleMultipleSelection(selectedId) {

        let cpyMultiple = [...multiple]
        const multipleSelectionIndex = cpyMultiple.indexOf(selectedId)

        // console.log(multipleSelectionIndex);

        if (multipleSelectionIndex === -1) cpyMultiple.push(selectedId);
        else cpyMultiple.splice(multipleSelectionIndex, 1)

        setMultiple(cpyMultiple)
    }

    // console.log(selected, multiple);


    return (
        <div className={styles.faqContainer}>
            <h2>Frequently Asked Questions (FAQ)</h2>
            <button
                className={styles.selectionBtn}
                onClick={() => setMultipleSelection(!multipleSelection)}
            >MultiView Selection
            </button> &nbsp; <button className={styles.selectionBtn}>

                {multipleSelection ? "Multiple Selection FAQs" : "Single Selection FAQs"}</button>


            <div className={styles.wrapper}>
                <div className={styles.accordion}>
                    {faqData && faqData.length > 0

                        ? faqData.map(dataItem =>
                            <div className={styles.Item} key={dataItem.id}>
                                <div className={styles.title}
                                    onClick={multipleSelection
                                        ? () => HandleMultipleSelection(dataItem.id)
                                        : () => HandleSingleSelection(dataItem.id)}
                                >
                                    <h3>{dataItem.Question}</h3>
                                    <span>
                                        {
                                            multipleSelection
                                                ? multiple.includes(dataItem.id)
                                                    ? <i className="bi bi-eye"></i>
                                                    : <i className="bi bi-eye-slash"></i>
                                                : selected === dataItem.id
                                                    ? <i className="bi bi-eye"></i>
                                                    : <i className="bi bi-eye-slash"></i>
                                        }
                                    </span>
                                </div>


                                {multipleSelection
                                    ? multiple.includes(dataItem.id) && (
                                        <div className={styles.content}>
                                            <p>{dataItem.Answer}</p>
                                        </div>

                                    )
                                    : selected === dataItem.id && (<div className={styles.content}>
                                        <p>{dataItem.Answer}</p>
                                    </div>
                                    )}
                                {/* {selected === dataItem.id

                                    ? <div className={styles.content}>
                                        <p>{dataItem.Answer}</p>
                                    </div>

                                    : null
                                } */}
                            </div>
                        )


                        : <div>No Data Found!</div>}
                </div>
            </div>
        </div>
    )
}
