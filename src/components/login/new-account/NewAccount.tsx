'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import styles from './NewAccount.module.css';
import { useContext } from 'react';
import { ContextMaster } from '@/context/ContextProvider';

export const NewAccount = () => {
  const { createAccount, setCreateAccount } = useContext(ContextMaster);
  return (
    <div className={styles.buttonBlock}>
      {!createAccount && 
        <span>Já possui cadastro? Crie uma nova conta abaixo.</span>}
      <button onClick={()=>setCreateAccount(!createAccount)}>
        {!createAccount ? 'nova conta' : 'login'} 
        <FontAwesomeIcon icon={faArrowUpRightFromSquare}/>
      </button>
    </div>
  );
}