'use client';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { checkAuth } from '@/server/connection/conn';
import { ContextMaster } from '@/context/ContextProvider';

type Props = { children: React.ReactNode };

export const Protected = ({ children }: Props) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean|null>(null);
  const {setErrMsg} = useContext(ContextMaster);

  useEffect(() => {
    const verifyAuth = async () => {
      try{
        const authenticated = await checkAuth();
        if (!authenticated) router.replace('/login');
        setIsAuthenticated(true);
      }
      catch(e){
        setErrMsg((e as Error).message || 'Ocorreu um erro inesperado.');
      }
    };
    verifyAuth();
  }, [router, setErrMsg]);

  if (isAuthenticated === null) return;
  return children;
}