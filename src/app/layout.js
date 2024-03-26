'use client'

import { useEffect, useState } from 'react';
import client from "@/apollo/client/client"
import { ApolloProvider } from "@apollo/client"
import dynamic from 'next/dynamic';
import 'react-toastify/dist/ReactToastify.css';

const DynamicToastContainer = dynamic(() => import('react-toastify').then((module) => module.ToastContainer), { ssr: false });

export default function RootLayout({ children }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <html lang="en">
      <body>
        <ApolloProvider client={client}>
          {children}
          {isClient && <DynamicToastContainer />}
        </ApolloProvider>
      </body>
    </html>
  )
}