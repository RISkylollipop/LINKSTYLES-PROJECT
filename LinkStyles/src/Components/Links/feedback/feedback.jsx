import React from 'react'

import { useState, useEffect } from 'react'

import { MessageSquare } from 'react-feather'



import styles from './feedback.module.css'
import { toast, ToastContainer } from 'react-toastify'

const URL = import.meta.env.VITE_API_URL


const feedback = () => {

    const [feedbacks, setFeedbacks] = useState(null)
    const [feedbacksCount, setFeedbacksCount] = useState(0)

    useEffect(() => {

        const feedbackdata = async () => {
            try {
                const res = await fetch(`${URL}/api/v1/feedbacks`)
                const data = await res.json()

                if (data.length > 0) {
                    setFeedbacks(data)
                    setFeedbacksCount(data.length)
                }
                else {
                    setFeedbacks(null)
                    setFeedbacksCount(0)
                }
            } catch (error) {
                console.error(`Unable to fetch Data from database`)
            }

        }

        feedbackdata()
        const interval = setInterval(feedbackdata, 1000)

        return () => clearInterval(interval)

    }, [])

    const readfeedback = async (id) => {
        try {
            const res = await fetch(`${URL}/api/v1/readfeedback`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            })
            const data = await res.json()
            // console.log(data.message);
            toast.success(data.message)

        } catch (error) {
            console.error("Failed to read feedback:", error)
        }
    }

    return (

        <>
            <ToastContainer />
            <div className={styles.feed}>feedbacks</div>
            <div className={styles.tableWrapper}>
                <table>
                    <thead>
                        <tr>
                            <th >ID </th>
                            <th >Full Name</th>
                            <th >Email</th>
                            <th >Feedback</th>
                            <th >Action</th>
                        </tr>
                    </thead>

                    {feedbacks ? (<tbody>
                        {feedbacks && feedbacks.map((feed, index) => (
                            <tr key={feed?.id || `${index + 1}`}>
                                <td >{`${index + 1}`}</td>
                                <td >{feed.fullname?.toLowerCase()}</td>
                                <td >{feed.email?.toLowerCase()}</td>
                                <td >{feed.feedback?.toLowerCase()}</td>
                                <td className={styles.action}>
                                    <button
                                        onClick={() => readfeedback(feed.id)}
                                        className={styles.read}>Read
                                    </button>
                                    
                                    <button
                                        onClick={() => readfeedback(feed.id)}
                                        className={styles.delete}>Delete
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>)
                        :
                        (<div className={styles.emptyState}>
                            <div className={styles.iconWrap}>
                                <MessageSquare size={32} color="currentColor" strokeWidth={1.5} />
                                <span className={styles.badge}>+</span>
                            </div>
                            <p className={styles.title}>No feedback yet</p>
                            <p className={styles.subtitle}>When customers leave feedback, it will appear here.</p>
                        </div>)
                    }

                </table>


            </div>
        </>
    )
}

export default feedback