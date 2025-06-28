const svgrConfig = {
    webpack: (config: any) => {
        const fileLoaderRule = config.module.rules.find((rule: any) =>
            rule.test?.test?.('.svg')
        );

        config.module.rules.push({
            test: /\.svg$/i,
            issuer: fileLoaderRule.issuer,
            resourceQuery: {
                not: [...fileLoaderRule.resourceQuery.not, /url/],
            }, // exclude if *.svg?url
            use: ['@svgr/webpack'],
        });
        fileLoaderRule.exclude = /\.svg$/i;

        return config;
    },
    turbopack: {
        rules: {
            '*.svg': {
                loaders: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            typescript: true,
                            ref: true,
                            svgo: true,
                            svgoConfig: {
                                plugins: [
                                    {
                                        name: 'preset-default',
                                        params: {
                                            overrides: {
                                                removeViewBox: false,
                                            },
                                        },
                                    },
                                ],
                            },
                        },
                    },
                ],
                as: '*.tsx',
            },
        },
    },
};

export default svgrConfig;
