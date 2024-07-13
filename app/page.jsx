import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
    return (
        <div className={styles.main}>
            <h1>Home</h1>
            <Link href="/signup">Signup</Link>
        </div>
    );
}
