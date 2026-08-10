import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import JsonLd from '@/components/JsonLd';
import { getSiteConfig } from '@/lib/data';

const config = getSiteConfig();

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.dienlanhsonphat.io.vn'),
  title: {
    default: 'Sửa Máy Lạnh Phú Quốc | Điện Lạnh Sơn Phát',
    template: `%s | Điện Lạnh Sơn Phát`,
  },
  description: 'Sửa máy lạnh, vệ sinh và lắp đặt điện lạnh tại Phú Quốc. Hỗ trợ nhanh, báo giá rõ ràng, bảo hành dài hạn. Hotline 0961 316 346.',
  keywords: [
    'sửa máy lạnh phú quốc',
    'điện lạnh phú quốc',
    'vệ sinh máy lạnh phú quốc',
    'nạp gas máy lạnh phú quốc',
    'sửa điều hòa phú quốc',
    'thợ điện lạnh phú quốc',
  ],
  alternates: {
    canonical: 'https://www.dienlanhsonphat.io.vn',
  },
  authors: [{ name: config.brandName }],
  icons: {
    icon: '/images/son_phat_logo.png',
    shortcut: '/images/son_phat_logo.png',
    apple: '/images/son_phat_logo.png',
  },
  openGraph: {
    title: 'Sửa Máy Lạnh Phú Quốc | Điện Lạnh Sơn Phát',
    description: 'Sửa máy lạnh, vệ sinh và lắp đặt điện lạnh tại Phú Quốc. Hỗ trợ nhanh, báo giá rõ ràng, bảo hành dài hạn. Hotline 0961 316 346.',
    siteName: config.brandName,
    url: 'https://www.dienlanhsonphat.io.vn',
    images: [
      {
        url: '/images/son_phat_logo.png',
        width: 800,
        height: 800,
        alt: config.brandName,
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sửa Máy Lạnh Phú Quốc | Điện Lạnh Sơn Phát',
    description: 'Sửa máy lạnh, vệ sinh và lắp đặt điện lạnh tại Phú Quốc. Hỗ trợ nhanh, báo giá rõ ràng, bảo hành dài hạn. Hotline 0961 316 346.',
    images: ['/images/son_phat_logo.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <JsonLd />
      </head>
      <body className="min-h-screen flex flex-col antialiased selection:bg-hvac-primary selection:text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyCTA />
      </body>
    </html>
  );
}
