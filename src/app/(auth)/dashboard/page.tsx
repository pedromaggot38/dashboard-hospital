import Card from "@/app/(auth)/_ui/dashboard/card/card";
import styles from "./dashboard.module.css";
import Posts from "@/app/(auth)/_ui/dashboard/latestposts/latestposts";
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