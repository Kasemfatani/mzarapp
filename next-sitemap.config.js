/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.mzarapp.com', // Change this to your actual domain
    generateRobotsTxt: true, // (optional) Generates a robots.txt file
    sitemapSize: 5000,
    exclude: ['/secret-page'], // (optional) Pages you don’t want in sitemap
    changefreq: 'daily',
    priority: 0.7,
  };
  