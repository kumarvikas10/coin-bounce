import styles from './Loader.module.css';
import {TailSpin} from "react-loader-spinner";

function Loader ({text}) {
    return (
        <div className={styles.loaderWrapper}>
            <TailSpin 
            height={80}
            width ={80}
            radius = {1}
            color = {"#b538fb"}
            />
            <h2>Loading {text}</h2>
        </div>
    )
}

export default Loader;