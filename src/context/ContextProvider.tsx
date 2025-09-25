'use client';

import { createContext, useState } from 'react';
import { 
  type ReactNode, type Dispatch, type SetStateAction,
} from 'react';

type ProviderProps = { children: ReactNode; }

type TContextMaster = {
  endPreview: boolean,
  currentPage: number,
  setEndPreview: Dispatch<SetStateAction<boolean>>
  setCurrentPage: Dispatch<SetStateAction<number>>,
}

export const ContextMaster = createContext<TContextMaster>({
  endPreview: false, setEndPreview: ()=>{},
  currentPage: 0, setCurrentPage: ()=>{},
});

export const ContextProvider = ({ children }: ProviderProps): React.ReactNode =>{
  const [endPreview, setEndPreview] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const contextValue: TContextMaster = { endPreview, setEndPreview, currentPage, setCurrentPage }

  return (
    <ContextMaster.Provider value={contextValue}>
      {children}
    </ContextMaster.Provider>
  );
}