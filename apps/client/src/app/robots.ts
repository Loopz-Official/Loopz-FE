import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: ['Googlebot', 'Bingbot', 'Slurp', 'Yeti', 'Daumoa'],
                allow: ['/about', '/filter/', '/obje/', '/main'],
                disallow: [
                    '/auth/',
                    '/cart/',
                    '/mypage/',
                    '/order/',
                    '/address/',
                    '/agreement/',
                    '/oauth/',
                ],
            },
            {
                userAgent: '*',
                disallow: ['/'],
            },
        ],
        sitemap: 'https://loopz.co.kr/sitemap.xml',
    };
}
