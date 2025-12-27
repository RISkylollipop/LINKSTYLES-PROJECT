import styles from './Footer.module.css'

const Copyright = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentDay = now.getDate();
  const currentMonth = now.toLocaleString("default", { month: "long" }); 
  // e.g., "January", "February"

  return (
    <footer className={styles.copyRight}>
      <p>
        As at today: {currentDay} {currentMonth}, {currentYear}
      </p>
      <p>
        &copy; {currentYear} Links Styles. All rights reserved.
      </p>
    </footer>
  );
};

  
  export default Copyright;