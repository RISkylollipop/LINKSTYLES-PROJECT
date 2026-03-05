import React, { useContext, useEffect, useState } from 'react'

const Checkout = () => {


    function checkout() {
        useEffect(() => {
            fetch(`http://localhost:3005//api/v1/generate-account`,
                {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        customerName: formData.fullName,
                        customerEmail: formData.email,
                        amount: total
                    })
                }

            )
        }, [total])
    }

    return (
        <>
            <div>
                Checkout
            </div>

        </>
    )
}

export default Checkout