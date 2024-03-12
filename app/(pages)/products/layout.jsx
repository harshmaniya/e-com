'use client'

import { Inter } from "next/font/google";
import "../../globals.css";
import SideBar from '@/app/_components/sideBar'

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>      
      <SideBar />
      {children}    
      </body>
    </html>
  );
}