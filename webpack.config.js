const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: './src/index.tsx',

        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isProduction ? '[name].[contenthash].js' : '[name].js',
            clean: true,
        },

        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.css'],
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
        },

        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                ['@babel/preset-react', { runtime: 'automatic' }],
                                '@babel/preset-typescript'
                            ],
                        },
                    },
                },
                {
                    test: /\.module\.(scss|sass)$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    mode: 'local',
                                    localIdentName: isProduction
                                        ? '[hash:base64:8]'
                                        : '[name]__[local]--[hash:base64:5]',
                                },
                                sourceMap: true,
                            },
                        },
                        'sass-loader',
                    ],
                },
                {
                    test: /\.(scss|sass)$/,
                    exclude: /\.module\.(scss|sass)$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                        'sass-loader',
                    ],
                },
                {
                    test: /\.css$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                    ],
                },
                {
                    test: /\.(png|jpe?g|gif|svg|ico)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'images/[hash][ext][query]'
                    }
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'fonts/[hash][ext][query]'
                    }
                },
            ],
        },

        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './public/index.html',
            }),
            ...(isProduction
                ? [
                    new MiniCssExtractPlugin({
                        filename: '[name].[contenthash].css',
                        chunkFilename: '[id].[contenthash].css',
                    }),
                ]
                : []),
        ],

        devServer: {
            static: {
                directory: path.join(__dirname, 'public'),
            },
            compress: true,
            port: 3000,
            open: true,
            hot: true,
            historyApiFallback: true,
        },

        optimization: {
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            },
        },

        devtool: isProduction ? 'source-map' : 'eval-source-map',
    };
};