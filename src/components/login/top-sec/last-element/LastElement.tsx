import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHtml5, faCss3 } from '@fortawesome/free-brands-svg-icons';
import styles from '../TopSec.module.css';

export const LastElement = () => 
  <div 
    className={`
      ${styles.wrapSpanIcon} 
      ${styles.wrapSpanIconLast} 
      ${styles.wrapSpanIconBlue}`
    }
  >
    <span>Layout desenvolvido de forma pura.</span>
    <div className={styles.wrapIcon}>
      <FontAwesomeIcon icon={faHtml5} className={styles.iconHtml}/>
      <FontAwesomeIcon icon={faCss3}/>
    </div>
  </div>