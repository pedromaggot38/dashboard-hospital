import Navbar from "@/app/(auth)/_ui/dashboard/navbar/navbar"
import Sidebar from "@/app/(auth)/_ui/dashboard/sidebar/sidebar"
import styles from "@/app/(auth)/_ui/dashboard/dashboard.module.css"
import "./style.css"

const Layout = ({ children }: { children: React.ReactNode }) => {

    return (
        <div className={styles.container}>
            <div className={styles.menu}>
                <Sidebar />
            </div>
            <div className={styles.content}>
                <Navbar />
                {children}
            </div>
        </div>
    )
}

export default Layout