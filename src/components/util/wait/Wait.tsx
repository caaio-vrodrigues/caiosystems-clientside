import { Spinner } from '../spinner/Spinner';
import styles from './Wait.module.css';

export const Wait = () => 
  <div className={styles.wrapMsg}>
    <p>Aguarde...</p>
    <Spinner login={false}/>
  </div>