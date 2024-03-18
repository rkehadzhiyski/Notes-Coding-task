import CreateNote from "./CreateNote";
import styles from './home.module.css';

const Home = () => {
    return (
        <div className={styles['main-container']}>
            <h1>Create a note</h1>
            <CreateNote />
        </div>
    )
}

export default Home;