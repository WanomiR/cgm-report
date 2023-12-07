import styles from './app.module.scss';
import '../../main.scss';

// @ts-ignore
import GlucoseGraph from "../glucose-graph/glucose-graph";
import PercentileGraph from "../percentile-graph/percentile-graph";

const App = () => {
    return (
        <div className={styles.app}>
            <h1 className={styles.title}>Medhow Report</h1>
            {/*<GlucoseGraph />*/}
            <PercentileGraph />
        </div>
    );
};

export default App;
