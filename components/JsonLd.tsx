import React from 'react';
import { getSiteConfig } from '@/lib/data';

export default function JsonLd() {
  const config = getSiteConfig();

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: config.brandName,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop',
    '@id': 'https://dienlanhsonphatphuquoc.com',
    url: 'https://dienlanhsonphatphuquoc.com',
    telephone: config.hotlineRaw,
    priceRange: '150000VND - 1000000VND',
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
        opens: '07:00',
        closes: '17:00',
      },
    ],
    areaServed: config.serviceAreas,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />
  );
}
