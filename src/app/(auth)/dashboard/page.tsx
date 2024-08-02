import Card from "@/components/auth/dashboard/card/card";
import styles from "./dashboard.module.css";
import Posts from "@/components/auth/dashboard/latestposts/latestposts";
import Rightbar from "../../../components/auth/dashboard/rightbar/rightbar";

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