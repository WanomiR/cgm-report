import styles from './app.module.scss';
import '../../main.scss';
import Graph from "../../components/chart/chart";

const App = () => {
    return (
        <div className={styles.app}>
            <h1 className={styles.title}>Line graph</h1>
            <Graph />
        </div>
    );
};

export default App;
