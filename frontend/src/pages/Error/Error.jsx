import styles from './Error.module.css'
import {Link} from 'react-router-dom'

function Error(){
    return (
        <div className={styles.errorWrapper}>
            <div>Error 404 - Page not found</div>
            <div>Go Back to <Link to="/">Home</Link></div>
        </div>
    )
}

export default Error;
