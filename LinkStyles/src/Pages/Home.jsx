import CarouselImages from "../Components/CarouselImages/CarouselImages";
import Brandkit from "../Components/BrandKit/BrandKit";
import LatestTrend from "../Components/LatestTrend/LatestTrend";
import Footer from "../Components/Footer/Footer";
import ScrollToTop from '../Components/ScrollToTop'
import CopyRight from '../Components/Footer/CopyRight'

import styles from '../Pages/Home.module.css'


function Home() {

  

    
    return (

        <main className={styles.mainCarrier}>
           <div className="carouselImages">
                <CarouselImages />
            </div>

            <div className="brandkit">
                <Brandkit />
            </div>


             <div className='latesttrend'>
                <LatestTrend />
            </div>

            <div className="Footer">
                <Footer />
                <CopyRight/>
            </div>

            <div className='scrollToTop'>
            <ScrollToTop/>
            </div>

        </main>
    );
}

export default Home