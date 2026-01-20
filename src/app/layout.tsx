import type { Metadata } from "next";

import '@/styles/styles.css';
import { ContextProvider } from "@/context/ContextProvider";

export const metadata: Metadata = {
  title: "Caio Systems Portfólio",
  description: "Demosntração de um sistema de login completo",
};

type Props = Readonly<{children: React.ReactNode;}>

const RootLayout = ({ children }: Props) => 
  <html lang="pt-BR">
    <body suppressHydrationWarning={true}>
      <ContextProvider>
        {children}
      </ContextProvider>
    </body>
  </html>

export default RootLayout;