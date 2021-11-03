module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [{ source: "/v1/:path*", destination: "/api/v1/:path*" }];
  },
}
