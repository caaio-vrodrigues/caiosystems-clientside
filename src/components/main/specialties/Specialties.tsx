import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJava, faReact } from '@fortawesome/free-brands-svg-icons';
import { faLeftRight } from '@fortawesome/free-solid-svg-icons';
import styles from './Specialties.module.css';

export const Specialties = () => {
  const [isJavaRight, setIsJavaRight] = useState<boolean>(true);

  return(
    <section className={`${styles.wrapSpecialties}`}>
      <div className={`${styles.blockSpecialt} ${styles.blockSpecialtTool}`}>
        <FontAwesomeIcon  icon={isJavaRight ? faReact : faJava}/>
      </div>
      <div className={`${styles.blockSpecialt} ${styles.blockSpecialtCenter}`}>
        <button onClick={()=>setIsJavaRight(!isJavaRight)}>
          <FontAwesomeIcon icon={faLeftRight}/>
        </button>
      </div>
      <div className={`${styles.blockSpecialt} ${styles.blockSpecialtTool}`}>
        <FontAwesomeIcon icon={isJavaRight ? faJava : faReact}/>
      </div>
    </section>
  );
}