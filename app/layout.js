import './globals.css'
import { Inter, Poppins } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], weight: ['400','500','700'] })
const poppins = Poppins({ subsets: ['latin'], weight: ['400','500','700'] })

export const metadata = {
  title: 'Sentient AGI Quiz',
    icons: {
    icon: 'https://pbs.twimg.com/profile_images/1859727094789660672/h7RM1LNu_400x400.jpg'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.className} ${poppins.className} bg-blue-50`}>
      <body>{children}</body>
    </html>
  )
}