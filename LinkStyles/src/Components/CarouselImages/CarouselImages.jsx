import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js'
// import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';


import styles from './CarouselImages.module.css';

import slide1 from './slideimages/newSlide2.png';
import slide2 from './slideimages/slide6.png';
import slide3 from './slideimages/slide5.png';



function CarouselImages() {
  return (

    <>


      <Carousel pause={false} interval={5000} controls={false} indicators={false} className={styles.CarouselContainer}>
        <Carousel.Item className="CarouselItem">
          <img src={slide1} alt="Our Collection" />

          {/* Overlay Wrapper */}
          <div className={styles.CarouselText}>
            <div className={styles.carouselSubText}>
              <h3 className={styles.HeadText}>Discover Our Latest Collections</h3>
              <p className={styles.CarouselParagraph}>
                Step into the World of Fashion, with our latest unisex collection.
                Experience the perfect blend of style and comfort, designed for the
                modern day fashionista.
              </p>
            </div>

            <div>
              <button className={styles.LearnMoreButton}>Explore Now</button>
            </div>

          </div>
        </Carousel.Item>

        <Carousel.Item className="CarouselItem">
          <img src={slide2} alt="Our Collection" />

          <div className={styles.CarouselText}>
            <div className={styles.carouselSubText}>
              <h3 className={styles.HeadText}>Unveil Your Unique Style</h3>
              <p className={styles.CarouselParagraph}>
                Our Curated Collections Offer something for everyone.
                Find Your Perfect Match and Express your Individuality with our Diverse Range of Clothing.
              </p>
            </div>

            <div>
              <button className={styles.LearnMoreButton}>View More</button>
            </div>

          </div>
        </Carousel.Item>

        <Carousel.Item className="CarouselItem">
          <img src={slide3} alt="Our Collection" />

          <div className={styles.CarouselText}>
            <div className={styles.carouselSubText}>
              <h3 className={styles.HeadText}>Fashion Meets Functionality</h3>
              <p className={styles.CarouselParagraph}>
                Enjoy the perfect balance of fashion and practicality.
                Our collection is designed to keep you stylish and comfortable all day long.
              </p>
            </div>

            <div>
              <button className={styles.LearnMoreButton}>Shop Collection</button>
            </div>

          </div>
        </Carousel.Item>


      </Carousel>


    </>
  );
}

export default CarouselImages;