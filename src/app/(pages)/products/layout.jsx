'use client'

import { Inter } from "next/font/google";
// import "../../globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <div className="bg-slate-900 h-24 flex justify-center mt-10">
          <p className="text-white py-9">© 2024 e-com All rights reserved</p>
        </div>
      </body>
    </html>
  );
}
