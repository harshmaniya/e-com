'use client'


// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import Navbar from "@/src/components/Client/Navbar";
import PathBar from "@/src/components/Client/PathBar";
import { Inter } from "next/font/google";
import "@/src/css/userStyle.css";
// import { ApolloProvider } from "@apollo/client";
// import client from "@/apollo/client/client";
import Footer from "@/src/components/Client/Footer";



const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "e-com",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <ApolloProvider client={client}> */}
            <Navbar />
            <PathBar />
            {children}
            <Footer />     
          {/* <ToastContainer /> */}
        {/* </ApolloProvider> */}
      </body>
    </html>
  );
}