import styles from './PageLoading.module.css'
function PageLoading({name}) {
    return (
        <div className={styles.container}>
            <div className={styles.scalingbox}>{name}</div>
        </div>
    )
}

export default PageLoading