import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import styles from './Footer.module.css';

export const Footer = () => 
  <footer className={styles.foot}>
    <div className={styles.footTitle}>
      <h2>Developed by</h2>
      <div className={styles.copy}>
        <p>Caio Vinicius Rodrigues</p>
        <FontAwesomeIcon icon={faCopyright}/>
      </div>
    </div>
  </footer>