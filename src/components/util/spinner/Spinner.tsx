'use client';
import styles from './Spinner.module.css';

type Props = {
  login: boolean,
}

export const Spinner = ({ login }: Props) =>
  <span
    className={`${styles.spinner} ${login && styles.spinnerLogin}`}
    role='status'
    aria-label={'Carregando…'}
    aria-live='polite'
    title={'Carregando'}
  />