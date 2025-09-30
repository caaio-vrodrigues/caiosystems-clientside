'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAppleAlt, faClose } from '@fortawesome/free-solid-svg-icons';
import { logout } from '@/server/connection/conn';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { ContextMaster } from '@/context/ContextProvider';
import styles from './Header.module.css';

export const Header = () => {
  const { setErrMsg } = useContext(ContextMaster);
  const router = useRouter();

  const handleLogout = async () => {
    try{ await logout() }
    catch(e){ 
      setErrMsg((e as Error).message || 'Ocorreu um erro inesperado.');
    }
    finally{ router.replace('/login') }
  }

  return (
    <header className={styles.header}>
      <div className={`${styles.leftBlock} ${styles.block}`}>
        <FontAwesomeIcon icon={faAppleAlt}/>
      </div>
      <div className={`${styles.centerBlock} ${styles.block}`}>
        <h1>Caio V. Rodrigues Systems</h1>
      </div>
      <div className={`${styles.rightBlock} ${styles.block}`} >
        <span onClick={handleLogout}>
          <FontAwesomeIcon icon={faClose}/>
        </span>
      </div>
    </header>
  );
}
  