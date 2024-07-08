import Image from "next/image";
import styles from "./posts.module.css";

const Posts = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Latest Posts</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>User</td>
                        <td>Post</td>
                        <td>Status</td>
                        <td>Date</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div className={styles.user}>
                                <Image src="/noavatar.png" alt="" width="40" height="40" className={styles.userImage} />
                                <span className={styles.userName}>Pedro</span>
                            </div>
                        </td>
                        <td>
                            <span className={styles.postTitle}>Post title</span>
                        </td>
                        <td>
                            <span className={`${styles.status} ${styles.notposted}`}>Not posted</span>
                        </td>
                        <td className={styles.date}>24/05/2024</td>
                    </tr>
                    <tr>
                        <td>
                            <div className={styles.user}>
                                <Image src="/noavatar.png" alt="" width="40" height="40" className={styles.userImage} />
                                <span className={styles.userName}>Adryan</span>
                            </div>
                        </td>
                        <td>
                            <span className={styles.postTitle}>Post title</span>
                        </td>
                        <td>
                            <span className={`${styles.status} ${styles.posted}`}>Posted</span>
                        </td>
                        <td className={styles.date}>24/05/2024</td>
                    </tr>
                    <tr>
                        <td>
                            <div className={styles.user}>
                                <Image src="/noavatar.png" alt="" width="40" height="40" className={styles.userImage} />
                                <span className={styles.userName}>Rafael</span>
                            </div>
                        </td>
                        <td>
                            <span className={styles.postTitle}>Post title</span>
                        </td>
                        <td>
                            <span className={`${styles.status} ${styles.posted}`}>Posted</span>
                        </td>
                        <td className={styles.date}>24/05/2024</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Posts;
