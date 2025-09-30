'use client';
import { BottomSec } from './bottom-sec/BottomSec';
import { Form } from './form/Form';
import { TopSec } from './top-sec/TopSec';
import { NewAccount } from './new-account/NewAccount';
import { useContext, useEffect, useState } from 'react';
import { ContextMaster } from '@/context/ContextProvider';
import styles from './Login.module.css';
import { Welcome } from '../login/welcome/Welcome';
import { Error } from '../util/error/Error';
import { Wait } from '../util/wait/Wait';
import { ModalSuccesAssign } from '../util/modal/ModalSuccesAssign';

export const Login = () => {
  const [ preLoad, setPreLoad ] = useState<boolean>(true);
  const { 
    endPreview, errMsg, loading, succesAssign 
  } = useContext(ContextMaster);

  useEffect(()=>{setTimeout(()=>setPreLoad(false), 500)}, []);

  return (
    <div className={styles.loginContainer}>
      {preLoad ? <Wait/> : 
        <>
          <TopSec/>
          {errMsg && <Error/>}
          {endPreview ? 
            <>
              {!errMsg && loading && <Wait/>}
              {!errMsg && !loading &&
                <>
                  <NewAccount/>
                  <Form/>
                </>}
            </> 
            : !errMsg && !loading && <Welcome/>}
            {succesAssign && 
              <div className={styles.containerModal}>
                <ModalSuccesAssign/>
              </div>}
          <BottomSec/>
        </>}
    </div>
  );
}