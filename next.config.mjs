import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "play.pokemonshowdown.com",
            },
        ],
    },
};

export default withNextIntl(nextConfig);