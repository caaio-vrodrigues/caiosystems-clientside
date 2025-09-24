'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import styles from './Form.module.css';

export const Form = () => {
  return <>
    <div className={styles.loginTitle}>
      <h1>Login</h1>
    </div>
    <form className={styles.formLogin} onSubmit={()=>{}}>
      <div className={`${styles.wrapInput} ${styles.wrapInputEmail}`}>
        <input
          type="email"
          placeholder="E-mail"
          name="email"
          autoComplete="username"
          required
          value={""}
          onChange={()=>{}}
        />
      </div>
      <div className={`${styles.wrapInput} ${styles.wrapInputPassword}`}>
        <input
          type="password"
          placeholder="Senha"
          name="password"
          autoComplete="current-password"
          required
          value={""}
          onChange={()=>{}}
          className={styles.passwordInput}
        />
        <button 
          type="submit" 
          className={styles.submitBtn} 
          disabled={false}
        >
          <span>entrar</span><FontAwesomeIcon icon={faHouseUser}/>
        </button>
      </div>
    </form>
  </>
}