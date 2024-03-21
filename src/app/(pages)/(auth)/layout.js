'use client'

import "@/src/css/userStyle.css";

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>
      {children}
      </body>
    </html>
  )
}