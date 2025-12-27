import { useState, useEffect } from 'react';

const useWindowControl = () => {

  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );
  const [height, setHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 0
  );
  const [scrollY, setScrollY] = useState(0);

  function handleResize() {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  function handleScrollY() {
    setScrollY(window.scrollY);
  }

  function fixhead() {
    return {
      position: 'sticky',
      top: '0',
      left: '0',
      textAlign: 'center',
      padding: '15px',
      width: '100%',
      zIndex: '1000',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    };
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScrollY);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScrollY);
    };
  }, []);

  return { width, height, scrollY, handleResize, handleScrollY, fixhead };
};

export default useWindowControl;