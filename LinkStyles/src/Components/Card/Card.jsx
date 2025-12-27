import styles from './Card.module.css';


const Card = ({
    name, storage, price, color, description, image, OPS,
    processor, battery, camera, connectivity, display, weight,
    dimensions, water_resistance, availability, product_details }) => {


    return (
        <>
            <div className={styles.cardContainer}>
                <div className={styles.card}>
                    <img src={image} alt={name} />
                        <div className="cardBody">
                            <h3 className={styles.cardTitle}>{name}</h3>
                            <p className={styles.cardParagraph}>{description}</p>
                        </div>
                </div>
            </div>
        </>
    );
}

export default Card