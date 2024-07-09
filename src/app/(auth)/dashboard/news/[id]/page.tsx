import Image from 'next/image'
import styles from './singlePost.module.css'


const SinglePostPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.imgContainer}>
                    <Image src="/noavatar.png" alt="" fill />
                </div>
                Pedro
            </div>
            <div className={styles.formContainer}>
                <form action="" className={styles.form}>
                    <label>ID</label>
                    <input type="text" name='id' placeholder='id' readOnly />

                    <label>Published by</label>
                    <input type="text" name='userId' placeholder='Pedro' readOnly />

                    <label>Created at</label>
                    <input type="date" name='createdat' placeholder='24-05-2024' readOnly />


                    <label>Description</label>

                    <label>Title</label>
                    <input type="text" name='title' placeholder='Title' />



                    <label>Published</label>
                    <select name="role" id="role">
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>

                    <label>Updated at</label>
                    <input type="date" name='updatedat' placeholder='30-06-2024' />



                    <div className={styles.buttons}>
                        <button className={styles.editButton}>Edit Post</button>
                        <button className={styles.submitButton}>Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SinglePostPage