const webpack = require('webpack');
const path = require('path');

const autoprefixer      = require('autoprefixer');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const isProd = process.env.npm_lifecycle_event === 'build'

const plugins = [
    new HtmlWebpackPlugin({
        template: './app/index.html',
        inject: 'body'
    }),
    new ExtractTextPlugin({
        filename: '[name].bundle.css'
    }),
    new OpenBrowserPlugin({ url: 'http://localhost:3000' })
]

if (isProd) plugins.push(
    new CopyWebpackPlugin([{
        from: __dirname + '/app/assets',
        to: __dirname + '/dist/assets'
    }])
)

module.exports = {
    entry: {
        app: ['es6-promise', './app/app.js']
    },

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: isProd ? './' : 'http://localhost:3000/'
    },

    devtool: isProd ? 'cheap-source-map' : 'source-map',

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ['es2015'] },
                }],
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                            sourceMap: true,
                            importLoaders: 2
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: [
                                autoprefixer({ browsers: ['last 2 version'] })
                            ]
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }]
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                use: [{
                    loader: 'file-loader?name=[name].[ext]&useRelativePath=true'
                }]
            },

            {
                test: /\.html$/,
                use: [ {
                    loader: 'html-loader',
                }]
            }

        ],
    },

    plugins,

    devServer: {
        contentBase: path.join(__dirname, 'app'),
        port: 3000
    }
};