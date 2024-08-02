import styles from './users.module.css'
import Search from '@/components/auth/dashboard/search/search'
import Link from 'next/link'
import Image from 'next/image'
import Pagination from '@/components/auth/dashboard/pagination/pagination'
const UsersPage = () => {

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="Search for a user" />
                <Link href="/dashboard/users/newuser" className={styles.newUser}>
                    <button className={styles.addButton}>New User</button>
                </Link>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Username</td>
                        <td>Email</td>
                        <td>Role</td>
                        <td>Created at</td>
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
                        <td>LkCpE@example.com</td>
                        <td>Admin</td>
                        <td>24/05/2024</td>
                        <td>
                            <div className={styles.buttons}>
                                <Link href="/dashboard/users/teste">
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

export default UsersPage