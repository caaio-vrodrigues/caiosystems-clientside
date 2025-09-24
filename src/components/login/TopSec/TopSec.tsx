import { LastElement } from './last-element/LastElement';
import { CenterElements } from './center-elements/CenterElements';
import { FirstElement } from './first-element/FirstElement';
import styles from './TopSec.module.css';

export const TopSec = () => 
  <section className={`${styles.secTop}`}>
    <div className={styles.containerTopElements}>
      <span className={styles.spanNone}>Caio V. Rodrigues Systems</span>
      <div className={`${styles.wrapTopElements}`}>
        <FirstElement/>
        <CenterElements/>
        <LastElement/>
      </div>
    </div>
  </section>
