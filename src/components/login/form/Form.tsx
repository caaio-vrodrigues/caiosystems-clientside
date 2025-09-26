'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import styles from './Form.module.css';

export const Form = () => {
  const [email, setEmail] = useState('caio@12');
  const [password, setPassword] = useState('12345678');
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
      const response = await fetch(`${SERVER_URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username: email,
          password: password,
        }).toString(),
      });

      if (response.ok) {
        const isLoggedIn = await response.json();
        if (isLoggedIn) router.push('/');
        router.push('/login');
      } 
      console.error(`Falha no login, dados inválidos`);
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  return <>
    <div className={styles.loginTitle}>
      <h1>Login</h1>
    </div>
    <form className={styles.formLogin} onSubmit={handleLogin}>
      <div className={`${styles.wrapInput} ${styles.wrapInputEmail}`}>
        <input
          type="email"
          placeholder="E-mail"
          name="email"
          autoComplete="username"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={`${styles.wrapInput} ${styles.wrapInputPassword}`}>
        <input
          type="password"
          placeholder="Senha"
          name="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.passwordInput}
        />
        <button
          type="submit"
          className={styles.submitBtn}
        >
          <FontAwesomeIcon icon={faHouseUser} />
        </button>
      </div>
    </form>
  </>
};