'use client'


import { Inter } from "next/font/google";
import "../.././../css/userStyle.css";
import Footer from "@/src/components/Client/Footer";
import Navbar from "@/src/components/Client/Navbar";
// import PathBar from "@/src/components/Client/PathBar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <ApolloProvider client={client}> */}
            <Navbar />
            {/* <PathBar /> */}
            <div className="min-h-[75.5vh]">
            {children}
            </div>
            <Footer />     
          {/* <ToastContainer /> */}
        {/* </ApolloProvider> */}
      </body>
    </html>
  );
}