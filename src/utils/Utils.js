export const forceFormatUrlPath = path => {
    return `/${path}`
        .replaceAll(/(\\{2,})|(\/{2,})/g, '/').trim();
};