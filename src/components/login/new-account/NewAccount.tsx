'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import styles from './NewAccount.module.css';

export const NewAccount = () => {
  return (
    <div className={styles.buttonBlock}>
      <span>Já possui cadastro? Crie uma nova conta abaixo.</span>
      <button onClick={()=>{}}>
        nova conta <FontAwesomeIcon icon={faArrowUpRightFromSquare}/>
      </button>
    </div>
  );
}