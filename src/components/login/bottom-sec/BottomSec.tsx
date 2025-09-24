import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { contacts } from '@/data/contactData';
import styles from './BottomSec.module.css';
import Link from 'next/link';

export const BottomSec = () => 
  <section className={`${styles.secBottom}`}>
    <a 
      className={`${styles.linkBgImg}`}
      href={`https://www.freepik.com/free-vector/white-technology
        -background-concept_6514902.htm#fromView=keyword&page=3&position=
        39&uuid=434c589d-d709-4b90-ac96-a95b48253ccb&query=Technology`}
      target='blank'
    >
      Background image by freepik
    </a>
    <div className={`${styles.wrapIcons}`}>
      {contacts.map(contact => 
        <Link key={contact.id} href={contact.link} target='blank'>
          <FontAwesomeIcon icon={contact.icon}/>
        </Link>)}
    </div>
  </section>