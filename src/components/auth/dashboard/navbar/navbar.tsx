'use client'
import { usePathname } from 'next/navigation'
import styles from './navbar.module.css'
import { useMemo } from 'react'
import { MdNotifications, MdOutlineChat, MdPublic, MdSearch } from 'react-icons/md'

const Navbar = () => {

    const pathname = usePathname()

    const capitalizedLastPath = useMemo(() => {
        const lastPath = pathname.split('/').pop();
        return capitalizeFirstLetter(lastPath);
    }, [pathname]);

    function capitalizeFirstLetter(string?: string) {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>{capitalizedLastPath}</div>
            <div className={styles.menu}>
                <div className={styles.search}>
                    <MdSearch />
                    <input type="text" placeholder='Search...' className={styles.searchInput} />
                </div>
                <div className={styles.icons}>
                    <MdOutlineChat size={20} />
                    <MdNotifications size={20} />
                    <MdPublic size={20} />
                </div>
            </div>
        </div>
    )
}

export default Navbar