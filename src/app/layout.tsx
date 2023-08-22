import Authprovider from '../components/Authprovider/Authprovider'
import { Providers } from "@/redux/provider";
import './globals.css'
import { Inter } from 'next/font/google'
import Header from  "../components/organisms/Header"
import PlayerCantainer from '@/components/organisms/PlayerCantainer';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }:any) {
  return (
    <html lang="en">
      <body>
        <Authprovider>
        <Providers>
        {children}
        </Providers>
        </Authprovider>
        </body>
    </html>
  )
}