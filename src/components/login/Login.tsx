'use client';
import { BottomSec } from './bottom-sec/BottomSec';
import { Form } from './form/Form';
import { TopSec } from './top-sec/TopSec';
import { NewAccount } from './new-account/NewAccount';
import { useContext } from 'react';
import { ContextMaster } from '@/context/ContextProvider';
import styles from './Login.module.css';

export const Login = () => {
  const { endPreview } = useContext(ContextMaster);
  return (
    <div className={styles.loginContainer}>
      <TopSec/>
      {endPreview ? 
        <>
          <NewAccount/>
          <Form/>
        </> 
        : "Welcome!"}
      <BottomSec/>
    </div>
  );
}