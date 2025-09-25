import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsTurnRight, faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import styles from './Welcome.module.css';

export const Welcome = () => 
  <div className={styles.wrapSkipAndCard}>
    <button 
      className={styles.buttonSkipPresentation}
      onClick={()=>{}}
    >
      <span>Pular apresentação </span>
      <FontAwesomeIcon icon={faArrowsTurnRight}/>
    </button>
    <div className={styles.wrapParagraphs}>
      <div className={styles.paragraphBlock}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. A adipisci nam iste ullam sit delectus perferendis incidunt nostrum repudiandae hic!
      </div>
      <div className={styles.wrapButtons}>
        <FontAwesomeIcon 
          icon={faAnglesLeft}
          className={styles.buttonNextPage}
          onClick={()=>{}}
        />
        <FontAwesomeIcon 
          icon={faAnglesRight}
          className={styles.buttonNextPage}
          onClick={()=>{}}
        />
      </div>
    </div> 
  </div> 
      