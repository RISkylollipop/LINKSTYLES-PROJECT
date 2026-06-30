import { useState, useEffect } from 'react';
import styles from './CarouselImages.module.css';

import slide1 from './slideimages/newSlide2.png';
import slide2 from './slideimages/slide6.png';
import slide3 from './slideimages/slide5.png';

const slides = [
  {
    image: slide1,
    tag: 'New Arrivals',
    heading: 'Discover Our Latest Collections',
    sub: 'Step into the world of fashion with our latest unisex collection — the perfect blend of style and comfort.',
    cta: 'Explore Now',
  },
  {
    image: slide2,
    tag: 'Curated For You',
    heading: 'Unveil Your Unique Style',
    sub: 'Find your perfect match and express your individuality with our diverse range of clothing.',
    cta: 'View Collection',
  },
  {
    image: slide3,
    tag: 'All Day Comfort',
    heading: 'Fashion Meets Functionality',
    sub: 'Designed to keep you stylish and comfortable from morning to night.',
    cta: 'Shop Now',
  },
];

function CarouselImages() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % slides.length);
        setAnimating(false);
      }, 600);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index) => {
    if (index === current) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 400);
  };

  return (
    <div className={styles.hero}>
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`${styles.slide} ${i === current ? styles.active : ''}`}
          aria-hidden={i !== current}
        >
          <img src={slide.image} alt={slide.heading} className={styles.bgImage} />
          <div className={styles.overlay} />
        </div>
      ))}

      <div className={`${styles.content} ${animating ? styles.fadeOut : styles.fadeIn}`}>
        <span className={styles.tag}>{slides[current].tag}</span>
        <h1 className={styles.heading}>{slides[current].heading}</h1>
        <p className={styles.sub}>{slides[current].sub}</p>
        <div className={styles.actions}>
          <button className={styles.ctaPrimary}>{slides[current].cta}</button>
          <button className={styles.ctaSecondary}>View All</button>
        </div>
      </div>

      <div className={styles.dots}>
        {slides.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <div className={styles.progress}>
        <div key={current} className={styles.progressBar} />
      </div>
    </div>
  );
}

export default CarouselImages;