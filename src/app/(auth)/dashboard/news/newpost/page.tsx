'use client'
import { LuExternalLink, LuFileVideo, LuImagePlus, LuPlusCircle } from 'react-icons/lu'
import styles from './newpost.module.css'
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.bubble.css"
import { useState } from 'react'
const NewPost = () => {

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    return (
        <div className={styles.container}>
            <input type="text" placeholder="Title" className={styles.input} />
            <div className={styles.editor}>
                <button className={styles.button} onClick={() => setOpen(!open)}>
                    <LuPlusCircle size={34} />
                </button>
                {open && (<div className={styles.textOptions}>
                    <button>
                        <LuImagePlus className={styles.addButton} />
                    </button>
                    <button>
                        <LuExternalLink className={styles.addButton} />
                    </button>
                    <button>
                        <LuFileVideo className={styles.addButton} />
                    </button>
                </div>
                )}
                <ReactQuill theme="bubble" value={value} onChange={setValue} placeholder="Content" className={styles.textArea} />
            </div>
            <button className={styles.publishButton}>Publish</button>
        </div>
    );
};

export default NewPost