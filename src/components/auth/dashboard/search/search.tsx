import { MdSearch } from "react-icons/md"
import styles from "./search.module.css"

const Search = ({ placeholder }: { placeholder: string }) => {
    return (
        <div className={styles.container}>
            <MdSearch />
            <input type="text" placeholder={placeholder} className={styles.searchInput} />
        </div>
    )
}

export default Search