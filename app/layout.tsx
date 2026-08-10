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
  title: {
    default: `${config.brandName} - Sửa Máy Lạnh Tận Nơi Tại Phú Quốc | Hotline ${config.hotline}`,
    template: `%s | ${config.brandName}`,
  },
  description: `${config.tagline}. Phục vụ nhanh sau 20 phút tại Dương Đông, Bãi Trường, An Thới. Thợ giỏi, báo giá công khai, bảo hành 3-12 tháng.`,
  keywords: [
    'sửa máy lạnh phú quốc',
    'vệ sinh máy lạnh phú quốc',
    'lắp đặt máy lạnh phú quốc',
    'thợ điện lạnh dương đông',
    'bảo trì máy lạnh resort phú quốc',
    'điện lạnh sơn phát',
  ],
  authors: [{ name: config.brandName }],
  openGraph: {
    title: `${config.brandName} - Dịch Vụ Điện Lạnh Uy Tín Số 1 Phú Quốc`,
    description: `Dịch vụ sửa chữa, bảo trì, vệ sinh & nạp gas máy lạnh tận nhà. Có mặt trong 30 phút. Bảo hành dài hạn.`,
    siteName: config.brandName,
    locale: 'vi_VN',
    type: 'website',
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
