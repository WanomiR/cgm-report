import styles from './app.module.scss';
import '../../main.scss';

import GlucoseGraph from "../glucose-graph/glucose-graph";

const App = () => {
    return (
        <div className={styles.app}>
            <h1 className={styles.title}>Glucose Graph</h1>
            <GlucoseGraph />
        </div>
    );
};

export default App;
