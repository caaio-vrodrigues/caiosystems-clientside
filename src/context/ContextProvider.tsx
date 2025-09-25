'use client';

import { createContext, useState } from 'react';
import { 
  type ReactNode, type Dispatch, type SetStateAction,
} from 'react';

type ProviderProps = { children: ReactNode; }

type TContextMaster = {
  endPreview: boolean,
  setEndPreview: Dispatch<SetStateAction<boolean>>
}

export const ContextMaster = createContext<TContextMaster>({
  endPreview: false,
  setEndPreview: ()=>{}
});

export const ContextProvider = ({ children }: ProviderProps): React.ReactNode =>{
  const [endPreview, setEndPreview] = useState<boolean>(false);
  const contextValue: TContextMaster = { endPreview, setEndPreview }

  return (
    <ContextMaster.Provider value={contextValue}>
      {children}
    </ContextMaster.Provider>
  );
}