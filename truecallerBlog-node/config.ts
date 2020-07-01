export const config = () => ({
    port: process.env.PORT,
    siteId: process.env.SITE_ID,
    postLimit: 2,
    currentBlogProvider: process.env.CURRENT_BLOG_PROVIDER,
    trueCallerApiBaseUrl: process.env.TRUE_CALLER_API_BASE_URL
})