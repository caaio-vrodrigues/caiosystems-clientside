import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import styles from '../TopSec.module.css';

export const FirstElement = () => 
  <div className={`${styles.wrapSpanIcon} ${styles.wrapSpanIconFirst}`}>
    <span>Developed by Caio V. Rodrigues Systems</span>
    <div className={styles.wrapIcon}>
      <FontAwesomeIcon icon={faCopyright}/> 2025
    </div>
  </div>