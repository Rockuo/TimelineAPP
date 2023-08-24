const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const indexHtml = require('./indexHtml.js')

const config = {
    entry: {
        timeline: './client/index.tsx',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                loader: "css-loader",
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            publicPath: 'dist',
            templateContent: indexHtml,
            hash: true,
        }),
    ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public/dist'),
        clean: true,
    },
};
module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        config.devtool = 'source-map';
    }
    return config;
}