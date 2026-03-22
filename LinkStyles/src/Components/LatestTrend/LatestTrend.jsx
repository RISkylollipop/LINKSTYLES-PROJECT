import React, {useContext} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import styles from './LatestTrend.module.css';
import { Link } from 'react-router-dom'

import LatestTrendImage1 from './LatestTrendImages/latesttrend1.png'
import LatestTrendImage2 from './LatestTrendImages/latesttrend2.png';
import LatestTrendImage3 from './LatestTrendImages/latesttrend3.png';

import { ClothContext } from "../Context/ClothContext";





const latesttrends = [
    { id: 1, image: LatestTrendImage1, name: "Stylish Ankle Boot", price: "20999" },
    { id: 2, image: LatestTrendImage2, name: "Comfortable Sneakers", price: "4999.99" },
    { id: 3, image: LatestTrendImage3, name: "Colorful Beaded Braclet", price: "4599.99" }
]




function LatestTrend() {

    const {symbol} = useContext(ClothContext)
    return (
        <div className={styles.latesttrend}>

            <div className={styles.latesTrendTextContainer}>

                <div className={styles.latestTrendText}>
                    <h1 className={styles.latestTrendHead}><b>Latest Trends</b></h1>
                    <p>Discover the freshest styles just for you</p>
                </div>

                <div className={styles.latestTrendBtn}>
                    <Button variant="none" className={styles.latesttrendBtn}>Shop Now</Button>

                </div>

            </div>

            
            <div className={styles.latesttrendimageContainer}>

                {latesttrends.map((latesttrend) => (
                    <div className={styles.trendCard} key={latesttrend.id}>

                        <img src={latesttrend.image} alt="" />
                        <h3><b>{latesttrend.name}</b></h3>
                        <p>{symbol} {latesttrend.price}</p>
                        <a href="">Add to Cart</a>

                    </div>

                ))}



            </div>



        </div>
    )
}



export default LatestTrend;