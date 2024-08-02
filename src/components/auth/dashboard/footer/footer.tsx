import styles from "./footer.module.css"

const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>Etec Development</div>
            <div className={styles.text}>Copyright © 2024. All rights reserved.</div>
        </div>
    )
}

export default Footer