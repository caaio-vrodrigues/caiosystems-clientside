'use client';

import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import styles from './Form.module.css';
import { ContextMaster } from '@/context/ContextProvider';
import { createUser, loginAcces } from '@/server/connection/conn';

export const Form = () => {
  const [password, setPassword] = useState<string>('');
  const { 
    setErrMsg, setLoading, createAccount, setCreateAccount, username, 
    setUsername, 
  } = useContext(ContextMaster);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrMsg(null);
    setLoading(true);
    try{
      if(createAccount){
        await createUser({username, password});
        setCreateAccount(false);
        router.replace('/login');
      }
      else{
        await loginAcces({username, password});
        router.replace('/');
      }
    } 
    catch(e){
      setErrMsg((e as Error).message || 'Ocorreu um erro inesperado.');
    }
    finally{
      setPassword('');
      setLoading(false);
    }
  };

  return <>
    <div className={styles.loginTitle}>
      <h1>{!createAccount ? 'LOGIN': 'CADASTRAR'}</h1>
    </div>
    <form className={styles.formLogin} onSubmit={handleSubmit}>
      <div className={`${styles.wrapInput} ${styles.wrapInputEmail}`}>
        <input
          type="email"
          placeholder="E-mail"
          name="email"
          autoComplete="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className={`${styles.wrapInput} ${styles.wrapInputPassword}`}>
        <input
          type="password"
          placeholder="Senha"
          name="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.passwordInput}
        />
        <button
          type="submit"
          className={styles.submitBtn}
        >
          <FontAwesomeIcon icon={faHouseUser} />
        </button>
      </div>
    </form>
  </>
};