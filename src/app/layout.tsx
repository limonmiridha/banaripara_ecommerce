import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/views/appbars/Header';
import Footer from '@/views/appbars/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';
import { UserProvider } from '@/context/UserContext';
import StoreProvider from '@/store/StoreProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <UserProvider>
            <Header />
            {children}
            <Footer />
            <ToastContainer />
          </UserProvider>
        </StoreProvider>
      </body>
    </html>
  );
}