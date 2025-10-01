import './globals.css'
import { Inter, Poppins } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], weight: ['400','500','700'] })
const poppins = Poppins({ subsets: ['latin'], weight: ['400','500','700'] })

export const metadata = {
  title: 'Sentient AGI Quiz',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.className} ${poppins.className} bg-blue-50`}>
      <body>{children}</body>
    </html>
  )
}