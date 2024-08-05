import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: 'Next.js 14 Homepage',
    template: '%s | Next.js 14',
  },
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <GoogleAnalytics />
      <body className={inter.className}>
        <div className='container'>
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
