import { ContextMaster } from '@/context/ContextProvider';
import { useContext } from 'react';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Error.module.css';

export const Error = () => {
  const { errMsg, setErrMsg } = useContext(ContextMaster);

  return (
    <div className={`${styles.wrapMsg}`}>
      <p className={styles.errorMsg}>Error: {errMsg}</p>
      <div>
        <button className={styles.button} onClick={()=>setErrMsg(null)}>
           <FontAwesomeIcon icon={faBackward}/> <span>voltar</span>
        </button>
      </div>
    </div>
  );
}