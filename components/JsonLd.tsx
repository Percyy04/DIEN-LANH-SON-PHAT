import React from 'react';
import { getSiteConfig } from '@/lib/data';

export default function JsonLd() {
  const config = getSiteConfig();

  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    name: 'Điện Lạnh Sơn Phát',
    image: 'https://www.dienlanhsonphat.io.vn/images/son_phat_logo.png',
    logo: 'https://www.dienlanhsonphat.io.vn/images/son_phat_logo.png',
    '@id': 'https://www.dienlanhsonphat.io.vn',
    url: 'https://www.dienlanhsonphat.io.vn',
    telephone: '0961316346',
    priceRange: '120000VND - 1000000VND',
    address: {
      '@type': 'PostalAddress',
      streetAddress: config.address,
      addressLocality: 'Phú Quốc',
      addressRegion: 'Kiên Giang',
      addressCountry: 'VN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 10.2223789,
      longitude: 103.9452078,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    areaServed: config.serviceAreas,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Bao lâu thì thợ điện lạnh Sơn Phát tới nơi tại Phú Quốc?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Kỹ thuật viên túc trực tại các khu vực Dương Đông, Bãi Trường, An Thới nên sẽ có mặt trong vòng 20 - 30 phút sau khi nhận cuộc gọi.',
        },
      },
      {
        '@type': 'Question',
        name: 'Chi phí sửa máy lạnh có được báo trước không?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sơn Phát cam kết kiểm tra bắt đúng bệnh và báo giá minh bạch trước khi sửa chữa. Khách hàng đồng ý mới tiến hành làm.',
        },
      },
      {
        '@type': 'Question',
        name: 'Dịch vụ sửa chữa điện lạnh có bảo hành không?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tất cả các hạng mục sửa chữa và linh kiện thay thế đều được cấp phiếu bảo hành chính hãng từ 3 đến 12 tháng.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
