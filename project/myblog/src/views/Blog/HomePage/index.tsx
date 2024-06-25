import styles from './hompage.module.scss'
export default function index() {
    return (
        <div>
            <div className={styles.container}>
                <section id={styles.img_one} className={styles.img}>
                    <h1 className={`cssanimation ${styles.typing}`}>Welcome to my blog.</h1>
                </section>

            </div>
        </div>
    )
}
