import styles from '@/app/(auth)/_ui/dashboard/news/news.module.css'
import Search from '@/app/(auth)/_ui/dashboard/search/search'
import Link from 'next/link'
import Image from 'next/image'
import Pagination from '@/app/(auth)/_ui/dashboard/pagination/pagination'
const NewsPage = () => {

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="Look for news" />
                <Link href="/dashboard/news/newpost" className={styles.newPost}>
                    <button className={styles.addButton}>Add User</button>
                </Link>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Title</td>
                        <td>Description</td>
                        <td>Published</td>
                        <td>Created at</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div className={styles.title}>
                                <span className={styles.userName}>USA War News</span>
                            </div>
                        </td>
                        <td>Lorem ipsum dolor sit amet consectetur adipisicing elit...</td>
                        <td>Published</td>
                        <td>24/05/2024</td>
                        <td>
                            <div className={styles.buttons}>
                                <Link href="#">
                                    <button className={`${styles.button} ${styles.edit}`}>Edit</button>
                                </Link>
                                <Link href="#">
                                    <button className={`${styles.button} ${styles.view}`}>View</button>
                                </Link>
                                <Link href="#">
                                    <button className={`${styles.button} ${styles.delete}`}>Delete</button>
                                </Link>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Pagination />
        </div>
    )
}

export default NewsPage