import Link from 'next/link';
import styles from './Card.module.css';

type Props = {
  text: string,
  link: string | null,
  linkTxt: string | null,
}

export const Card = ({ text, link, linkTxt }: Props) => 
  <article className={`${styles.card}`}>
    <p>{text}</p>
    {link && <Link href={link} target='blank'>{linkTxt}</Link>}
  </article>
  
