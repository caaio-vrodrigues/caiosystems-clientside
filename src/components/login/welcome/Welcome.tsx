import { useContext, useState } from 'react';
import { ContextMaster } from '@/context/ContextProvider';
import { allPages } from '@/data/welcomeData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsTurnRight } from '@fortawesome/free-solid-svg-icons';
import styles from './Welcome.module.css';
import { Card } from './card/Card';

export const Welcome = () => {
  const [skipPresentation, setSkipPresentation] = useState<boolean>(false);
  const { currentPage } = useContext(ContextMaster);
  return <>
    {allPages.map((page, id) => {
      if(currentPage == id){
        return !skipPresentation && 
          <div key={id} className={styles.wrapSkipAndCard}>
            <button 
              className={styles.buttonSkipPresentation}
              onClick={()=>setSkipPresentation(true)}
            >
              <span>Pular apresentação </span>
              <FontAwesomeIcon icon={faArrowsTurnRight}/>
            </button>
            <Card key={id} strs={page}/>
          </div> 
      }
    })}
  </>
}