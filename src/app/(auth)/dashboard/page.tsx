import Card from "../_ui/dashboard/card/card";
import Chart from "../_ui/dashboard/chart/chart";
import styles from "../_ui/dashboard/dashboard.module.css";
import Posts from "../_ui/dashboard/posts/posts";
import Rightbar from "../_ui/dashboard/rightbar/rightbar";
const Dashboard = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.cards}>
                    <Card />
                    <Card />
                    <Card />
                </div>
                <Posts />
            </div>
            <div className={styles.side}>
                <Rightbar />
            </div>
        </div>
    )
};

export default Dashboard;