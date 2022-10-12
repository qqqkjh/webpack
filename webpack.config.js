const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
    entry: './src/index.js',

    resolve: {
        extensions: ['.js', '.jsx'],
        alias : {
            "@" : path.resolve(__dirname, "./src")
        }
    },

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'static/js/[name].[contenthash:8].js',
        chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
        assetModuleFilename: 'static/media/[name].[hash:8].[ext]',
        clean: true,

    },

    devtool: devMode ? 'eval-source-map' : false,

    devServer: {
        port : 3005,
        hot: true,
        open: true,
        client : {
          overlay :true,
          progress : true,
        }
    },

    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.(js|jsx)$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [['@babel/preset-env', { targets: 'defaults' }]],
                                plugins: devMode ? ['react-refresh/babel'] : [],
                            },
                        },
                    },
                    {
                        test: /\.css$/i,
                        use: [
                            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                            'css-loader',
                        ],
                    },
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        type: 'asset',
                        parser: {
                            dataUrlCondition: {
                                maxSize: 10000,
                            },
                        },
                    },
                    {
                        type: 'asset/resource',
                        exclude: [/\.(js|jsx)$/, /\.html$/, /\.json$/, /^$/],
                    },
                ],
            },
        ],
    },

    plugins: [

        //body 에 모든 webpack 번들을 포함하는 HTML5 파일을 생성
        new HtmlWebpackPlugin(
            {
                ...{template: 'public/index.html'}
                , ...!devMode ? {
                        minify: {
                            removeComments: true,
                            collapseWhitespace: true,
                            removeRedundantAttributes: true,
                            useShortDoctype: true,
                            removeEmptyAttributes: true,
                            removeStyleLinkTypeAttributes: true,
                            keepClosingSlash: true,
                            minifyJS: true,
                            minifyCSS: true,
                            minifyURLs: true,
                        },
                } : {}
            }
        ),

        // package.json 의 script 에서 %PUBLIC% 과같은 옵션을 사용가능하게 해줌
        new InterpolateHtmlPlugin({ PUBLIC_URL: '' }),

        //코드 변경시 핫리로드 / CSS 를 별도의 파일로 추출 후 CSS 가 포함된 JS 파일별로 CSS 파일을 생성
        ...devMode ? [new ReactRefreshWebpackPlugin()] : [new MiniCssExtractPlugin()]
    ]
    ,

}