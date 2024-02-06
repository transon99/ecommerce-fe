/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com'
            },
            {
                protocol: 'https',
                hostname: 'picsum.photos'
            },
            {
                protocol: 'https',
                hostname: 'kccshop.vn'
            },

        ]
    }
}

module.exports = nextConfig
