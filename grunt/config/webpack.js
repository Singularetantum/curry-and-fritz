module.exports = function (grunt, options) {

    /* skip loading if task is not necessary for current target */
    if (!grunt.isConfigLoadingRequired('webpack')) {
        return {};
    }

    return (function () {

        const path = require('path');
        const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
        const DotenvPlugin = require('dotenv-webpack');
        const webpack = require('webpack');
        const plugins = [
            new webpack.IgnorePlugin(/^(.*)$/, /node-jsb$/),
            new DotenvPlugin(),
        ];

        /* remember to update jest transformer at tests/setup/ when changing loader options */
        const getLoaderRulesConfig = (targets, debug = false) => ([
            {
                test: /\.ejs$/,
                loader: 'ejs-webpack-loader',
                options: {
                    client: true,
                    _with: false,
                    localsName: 'data',
                    compileDebug: debug,
                    htmlmin: true,
                    htmlminOptions: {
                        removeComments: true,
                    },
                },
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: 'import-glob',
                include: [path.resolve('<%= paths.src %>')],
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                /* remember to update jest transformIgnorePatterns at grunt/config/jest.js when adding includes */
                include: [path.resolve('<%= paths.src %>')],
                options: {
                    compact: true,
                    cacheDirectory: true,
                    cacheCompression: false,
                    babelrc: false,
                    plugins: [
                        [
                            '@babel/plugin-transform-runtime', {
                                regenerator: false,
                                useESModules: true,
                            },
                        ],
                        ['@babel/plugin-proposal-class-properties', { loose: true }],
                    ],
                    presets: [
                        [
                            '@babel/preset-env', {
                                modules: false,
                                loose: true,
                                useBuiltIns: 'usage',
                                corejs: { version: 3, proposals: true },
                                targets,
                                debug,
                            },
                        ],
                    ],
                },
            },
        ]);

        return {
            options: {
                cache: true,
                entry: {
                    main: './<%= paths.src %>/js/_main.js',
                },
                output: {
                    filename: '[name].js',
                    chunkFilename: '[name].js',
                    path: path.resolve('<%= paths.static %>/generated/'),
                },
                plugins,
                resolve: {
                    mainFields: ['browser', 'main', 'module'],
                    symlinks: false,
                },
                performance: {
                    maxEntrypointSize: 500000,
                    maxAssetSize: 500000,
                },
            },
            analyze: {
                mode: 'production',
                watch: true,
                stats: {
                    maxModules: 99999,
                },
                optimization: {
                    concatenateModules: false,
                },
                output: {
                    path: path.resolve('<%= paths.tmp %>/js/'),
                },
                module: {
                    rules: getLoaderRulesConfig({ esmodules: true }, true),
                },
                plugins: [new BundleAnalyzerPlugin()],
            },
            dev: {
                mode: 'development',
                module: {
                    rules: getLoaderRulesConfig({ browsers: options.browserslist }),
                },
            },
            dist: {
                mode: 'production',
                module: {
                    rules: getLoaderRulesConfig({ browsers: options.browserslist }),
                },
            },
        };
    }());
};
