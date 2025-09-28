import { ContextMaster } from '@/context/ContextProvider';
import styles from './Error.module.css';
import { useContext } from 'react';

export const Error = () => {
  const { errMsg } = useContext(ContextMaster);

  return (
    <div className={`${styles.wrapMsg}`}>
      <p className={styles.errorMsg}>{errMsg}</p>
    </div>
  );
}