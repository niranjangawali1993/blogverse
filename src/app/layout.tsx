import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import { CommonContextProvider } from '@/contexts';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-quill/dist/quill.snow.css';
import UserContextProvider from '@/contexts/user/UserContextProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Blogverse',
  description: 'Blogverse',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className}`}>
        <CommonContextProvider>
          <UserContextProvider>
            <ToastContainer />
            {/* <Header /> */}
            {/* <div className='mt-20'>{children}</div> */}
            <div>{children}</div>
          </UserContextProvider>
        </CommonContextProvider>
      </body>
    </html>
  );
}
