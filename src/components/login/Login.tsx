'use client';
import { BottomSec } from './bottom-sec/BottomSec';
import { Form } from './form/Form';
import { TopSec } from './top-sec/TopSec';
import { NewAccount } from './new-account/NewAccount';
import { useContext, useEffect, useState } from 'react';
import { ContextMaster } from '@/context/ContextProvider';
import styles from './Login.module.css';
import { Welcome } from '../login/welcome/Welcome';
import { Spinner } from '../util/Spinner';

export const Login = () => {
  const [ preLoad, setPreLoad ] = useState<boolean>(true);
  const { endPreview, errMsg, loading } = useContext(ContextMaster);

  useEffect(()=>{setTimeout(()=>setPreLoad(false), 500)}, []);

  return (
    <div className={styles.loginContainer}>
      {preLoad ?  
        <div className={styles.wrapSpinner}>
          <span>Aguarde...</span>
          <Spinner login={false}/>
        </div> : 
        <>
          <TopSec/>
          {endPreview ? 
            <>
              {errMsg && <p>{errMsg}</p>}
              {!errMsg && loading &&
                <div className={styles.wrapSpinner}>
                  <span>Aguarde...</span>
                  <Spinner login={false}/>
                </div>}
              {!errMsg && !loading &&
                <>
                  <NewAccount/>
                  <Form/>
                </>}
            </> 
            : !errMsg && !loading && <Welcome/>}
          <BottomSec/>
        </>}
    </div>
  );
}