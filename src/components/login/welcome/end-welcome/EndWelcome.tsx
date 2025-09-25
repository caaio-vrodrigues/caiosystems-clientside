import { useEffect, useContext } from 'react';
import { ContextMaster } from '@/context/ContextProvider';
import { Spinner } from '@/components/util/Spinner';
import styles from './EndWelcome.module.css';

export const EndWelcome = () => {
  const { setEndPreview } = useContext(ContextMaster);
  useEffect(()=> { setTimeout(()=>setEndPreview(true), 3000) }, [setEndPreview]);
  return (
    <div className={`${styles.wrapMsgReady}`}>
      <p>{'Finalizando apresentação, aguarde.'}</p> 
      <Spinner login={false}/>
    </div>
  );
}