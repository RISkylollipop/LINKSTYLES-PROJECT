import React, { useContext, useEffect, useState } from 'react'

const Checkout = () => {


    function checkout() {
        useEffect(() => {
            fetch(`linkstyles-project-production.up.railway.app/api/v1/generate-account`,
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