import Image from 'next/image'
import styles from './singleUser.module.css'


const SingleUserPage = () => {
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
                    <input type="text" name='id' placeholder='id' />

                    <label>Name</label>
                    <input type="text" name='Name' placeholder='Pedro' />

                    <label>Username</label>
                    <input type="text" name='username' placeholder='pehbathory' />

                    <label>Email</label>
                    <input type="email" name='email' placeholder='pedromaggot38@gmail.com' />

                    <label>Password</label>
                    <input type="password" name='password' />

                    <label>Phone</label>
                    <input type="text" name='phone' placeholder='+5518998150638' />

                    <label>Role</label>
                    <select name="role" id="role">
                        <option value="root">Root</option>
                        <option value="admin">Admin</option>
                        <option value="news">News</option>
                    </select>

                    <label>Created at</label>
                    <input type="date" name='createdat' placeholder='24-05-2024' />
                    <button className={styles.submitButton}>Update</button>
                </form>
            </div>
        </div>
    )
}

export default SingleUserPage