'use client'

import client from "@/apollo/client/client"
import { ApolloProvider } from "@apollo/client"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>
      <ApolloProvider client={client}> 
      {children}
      <ToastContainer />
      </ApolloProvider>
      </body>
    </html>
  )
}