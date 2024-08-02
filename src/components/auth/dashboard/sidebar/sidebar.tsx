import styles from "./sidebar.module.css"
import {
    MdDashboard,
    MdSettings,
    MdLogout,
    MdHelp
} from "react-icons/md"
import { FaUsers, FaNewspaper, FaUser } from "react-icons/fa";
import MenuLink from "./menuLink/menuLink";
import Image from "next/image";

const menuItems = [
    {
        title: "Pages",
        list: [
            {
                title: "Dashboard",
                path: "/dashboard",
                icon: <MdDashboard />
            },
            {
                title: "Users",
                path: "/dashboard/users",
                icon: <FaUsers />
            },
            {
                title: "News",
                path: "/dashboard/news",
                icon: <FaNewspaper />
            },
        ],
    },
    {
        title: "User",
        list: [
            {
                title: "Settings",
                path: "/dashboard/settings",
                icon: <MdSettings />
            },
            {
                title: "Help",
                path: "/dashboard/help",
                icon: <MdHelp />
            },
        ]
    }
]
const Sidebar = () => {

    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <Image className={styles.userImage} src="/noavatar.png" alt="" width="50" height="50" />
                <div className={styles.userDetail}>
                    <span className={styles.userName}>Pedro</span>
                    <span className={styles.userRole}>Administrator</span>
                </div>
            </div>

            <ul className={styles.list}>
                {menuItems.map((cat) => (
                    <li key={cat.title}>
                        <span className={styles.cat}>{cat.title}</span>
                        {cat.list.map(item => (
                            <MenuLink key={item.title} item={item} />
                        ))}
                    </li>
                ))}
            </ul>

            <button className={styles.logout}>
                <MdLogout />
                Logout
            </button>

        </div>
    )
}

export default Sidebar