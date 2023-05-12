// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/work',
        destination: '/about',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig