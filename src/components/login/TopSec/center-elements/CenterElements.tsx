import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJava, faReact } from '@fortawesome/free-brands-svg-icons';
import styles from '../TopSec.module.css';

export const CenterElements = () => 
  <>
    <div className={`${styles.wrapSpanIcon} ${styles.wrapSpanIconBlue}`}>
      <span>Frontend criado com React-js + Next-js</span>
      <div className={styles.wrapIcon}>
        <FontAwesomeIcon icon={faReact}/>
      </div>
    </div>
    <div className={`${styles.wrapSpanIcon}`}>
      <span>Backend programado com Java + Springboot</span>
      <div className={styles.wrapIcon}>
        <FontAwesomeIcon icon={faJava}/>
      </div>
    </div>
  </>