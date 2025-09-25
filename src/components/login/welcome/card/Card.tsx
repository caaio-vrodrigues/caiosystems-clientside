import { ContextMaster } from '@/context/ContextProvider';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import styles from './Card.module.css';
import Link from 'next/link';

type Props = {
  strs: {
    id: number,
    str: string,
  }[],
};

export const Card = ({ strs }: Props) => {
  const { currentPage, setCurrentPage  } = useContext(ContextMaster);
  
  return(
    <div className={styles.wrapParagraphs}>
      <div className={styles.paragraphBlock}>
        {strs.map(p => 
          p.id == 100 ? 
            <div key={p.id} className={`${styles.wrapLink}`}>
              <Link href={p.str} target='_blank'>
                {'certificado-caio-oracle-java-se8'}
              </Link>
            </div>
            : <p key={p.id}>{p.str}</p>
        )}
      </div>
      <div className={styles.wrapButtons}>
        <FontAwesomeIcon 
          icon={faAnglesLeft}
          className={styles.buttonNextPage}
          onClick={()=>setCurrentPage(currentPage > 0 ? currentPage - 1 : 0)}
        />
        <FontAwesomeIcon 
          icon={faAnglesRight}
          className={styles.buttonNextPage}
          onClick={()=>setCurrentPage(currentPage + 1)}
        />
      </div>
    </div> 
  );
}