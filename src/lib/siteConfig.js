const dev = process.env.NODE_ENV !== 'production';
const baseHost = dev
  ? 'http://localhost:3000'
  : process.env.NEXT_PUBLIC_VERCEL_URL ?? process.env.PRODUCTION_URL ?? '';

export { dev, baseHost };
