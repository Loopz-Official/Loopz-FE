const svgrConfig = {
    turbopack: {
        rules: {
            '*.svg': {
                loaders: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            typescript: true,
                            ref: true,
                        },
                    },
                ],
                as: '*.tsx',
            },
        },
    },
};

export default svgrConfig;
