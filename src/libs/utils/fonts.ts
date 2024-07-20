import { Noto_Sans_Thai as FontSans } from 'next/font/google';

export const fontSans = FontSans({
  display: 'swap',
  subsets: ['latin', 'thai'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-sans',
});
