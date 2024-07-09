import styles from './login.module.css';
const Login = () => {
    return (
        <div className={styles.container}>
            <form action="" className={styles.form}>
                <h1 className={styles.title}>Login</h1>
                <input type="text" placeholder="Username" />
                <input type="text" placeholder="Password" />
                <button className={styles.loginButton}>Login</button>
            </form>
        </div>
    )
};

export default Login;