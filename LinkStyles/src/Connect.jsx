import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
function Connect() {

    const [result, setResult] = useState([])
    const [maindata, setMaindata] = useState([])


    useEffect(() => {
        fetch(`https://linkstyles-project-production.up.railway.app/api/v1/products`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setResult(data)
                
            })
            .catch((error) => console.error(error))
    }, []);

    return (
        <>
            <div>
                {result.map((results) => (
                    // 
                    <div className="card">
                        <div className="card-body">
                            <span>Product Id: {results.product_id}</span>
                            <br />
                            <img src={results.product_image_url} alt="" style={{width: "200px"}}/>
                            <br />
                            <span><p>Product Category: {results.product_category}</p></span>
                            <br />
                            <span><p>Stock Left: {results.stock}</p></span>
                            <br />
                            <span><p style={{color: "green"}}>Price: {results.price}</p></span>
                            <br />
                            <span><p>Product Detail: {results.product_details}</p></span>
                            <br />
                            <span><p>Manufacture By: <br /> {results.manufacture_company} in {results.company_location}</p> </span>
                            <br />
                             
                        </div>
                        <span><Button>Add To</Button> <Button variant="success">Buy Now</Button></span>
                    </div>
                ))}
            </div>
        </>
    );
}


export default Connect