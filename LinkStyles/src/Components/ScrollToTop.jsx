import React, { useEffect, useState } from 'react'

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [scrollY, setScrollY] = useState()



    useEffect(() => {
        const toggleButtonVisbilty = () => {
            if (window.scrollY > 800) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener(`scroll`, toggleButtonVisbilty)


        return () => {
            window.removeEventListener(`scroll`, toggleButtonVisbilty)
        }
    }, [scrollY])

    const handleBackToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    function HandleStyle() {
        return{
            position: 'fixed',
            bottom: "50px",
            right: "20px",
            maxWidth: "70px",
            borderRadius: "7px",
            zIndex: 1000
        }
    }
    return (
        <>

            {isVisible && (
                <button onClick={handleBackToTop}
                    style={HandleStyle()}>
                    <i
                        className="bi bi-arrow-up-circle">

                    </i>TOP
                </button>
            )}

        </>

    )
}

export default ScrollToTop