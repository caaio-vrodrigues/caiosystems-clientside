import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAppleAlt, faClose } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.css';

export const Header = () => 
  <header className={styles.header}>
    <div className={`${styles.leftBlock} ${styles.block}`}>
      <FontAwesomeIcon icon={faAppleAlt}/>
    </div>
    <div className={`${styles.centerBlock} ${styles.block}`}>
      <h1>Caio V. Rodrigues Systems</h1>
    </div>
    <div className={`${styles.rightBlock} ${styles.block}`} >
      <span onClick={()=>{}}>
        <FontAwesomeIcon icon={faClose}/>
      </span>
    </div>
  </header>