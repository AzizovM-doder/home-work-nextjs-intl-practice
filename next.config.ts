import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const nextConfig: NextConfig = {
    images: {
   remotePatterns: [
      {
        protocol: 'http',
        hostname: '37.27.29.18',
        port: '8001',
        pathname: '/images/**',
      },
    ],
  },
};
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);