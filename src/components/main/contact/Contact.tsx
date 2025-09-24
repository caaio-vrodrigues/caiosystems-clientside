import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { contacts, iconJava, oracle } from '@/data/contactData';
import styles from './Contact.module.css';
import Link from 'next/link';

export const Contact = () => 
  <section className={`${styles.contactContainer}`}>
    <div className={`${styles.contact}`}>
      {contacts.map(link => 
        <Link 
          key={link.id}
          href={link.link} 
          target='blank'
          className={`${styles.iconContact}`}
        >
          <FontAwesomeIcon icon={link.icon}/>
        </Link>
      )}
    </div>
    <div className={`${styles.certificateContainer}`}>
      <div className={`${styles.wrapCertificate}`}>
        <Link href={oracle} target='blank'>
          <FontAwesomeIcon icon={iconJava}/>
          <h2>Certified by Oracle</h2>
        </Link>
      </div>
    </div>
  </section>