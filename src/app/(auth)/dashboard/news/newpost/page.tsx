'use client'
import { LuExternalLink, LuFileVideo, LuImagePlus, LuPlusCircle } from 'react-icons/lu'
import styles from './newpost.module.css'
import { useState } from 'react'
const NewPost = () => {

    const [open, setOpen] = useState(false)
    return (
        <div className={styles.container}>
            <input type="text" placeholder="Title" />
            <div className={styles.editor}>
                <button className={styles.button}>
                    <LuPlusCircle size={34} />
                </button>
                {open && <div className={styles.textOptions}>
                    <button>
                        <LuImagePlus className={styles.addButton} />
                    </button>
                    <button>
                        <LuExternalLink className={styles.addButton} />
                    </button>
                    <button>
                        <LuFileVideo className={styles.addButton} />
                    </button>
                </div>}
            </div>
        </div>
    )
}

export default NewPost