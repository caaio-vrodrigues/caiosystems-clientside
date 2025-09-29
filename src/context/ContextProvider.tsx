'use client';

import { createContext, useState } from 'react';
import { 
  type ReactNode, type Dispatch, type SetStateAction,
} from 'react';

type ProviderProps = { children: ReactNode; }

type TContextMaster = {
  endPreview: boolean,
  currentPage: number,
  errMsg: string|null,
  loading: boolean,
  createAccount: boolean,
  username: string,
  succesAssign: boolean,
  setEndPreview: Dispatch<SetStateAction<boolean>>,
  setCurrentPage: Dispatch<SetStateAction<number>>,
  setErrMsg: Dispatch<SetStateAction<string|null>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setCreateAccount: Dispatch<SetStateAction<boolean>>,
  setUsername: Dispatch<SetStateAction<string>>,
  setSuccessAssign: Dispatch<SetStateAction<boolean>>,
}

export const ContextMaster = createContext<TContextMaster>({
  endPreview: false, setEndPreview: ()=>{},
  currentPage: 0, setCurrentPage: ()=>{},
  errMsg: null, setErrMsg: ()=>{},
  loading: false, setLoading: ()=>{},
  createAccount: false, setCreateAccount: ()=>{},
  username: '', setUsername: ()=>{},
  succesAssign: false, setSuccessAssign: ()=>{},
});

export const ContextProvider = ({ children }: ProviderProps): React.ReactNode =>{
  const [endPreview, setEndPreview] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [errMsg, setErrMsg] = useState<string|null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [createAccount, setCreateAccount] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [succesAssign, setSuccessAssign] = useState<boolean>(false);

  const contextValue: TContextMaster = { 
    endPreview, setEndPreview, currentPage, setCurrentPage, errMsg, setErrMsg,
    loading, setLoading, createAccount, setCreateAccount, username, setUsername,
    succesAssign, setSuccessAssign,
  }

  return (
    <ContextMaster.Provider value={contextValue}>
      {children}
    </ContextMaster.Provider>
  );
}