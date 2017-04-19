import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HTMLPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import webpack from 'webpack';

import config from './config';

const BABEL_ENV = process.env.BEBEL_ENV;
const PATHS = {
    SRC: `${__dirname}/src`,
    DIST: `${__dirname}/dist`
};

const exports = {
    entry: {
        bundle:`${PATHS.SRC}/index.js`,
        commons: []
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                include: PATHS.SRC,
                loader: 'babel-loader'
            }, {
                test: /\.(scss|css)$/,
                include: PATHS.SRC,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'sass-loader']
                })
            }, {
                test: /\.(png|jpg|gif)$/,
                include: PATHS.SRC,
                loader: 'file-loader'
            }
        ]

    },
    resolve: {
        extensions: ['.js', '.scss', '.sass']
    },
    output: {
        path: PATHS.DIST,
        publicPath: config.webpack.publicPath,
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: PATHS.DIST,
        hot: BABEL_ENV === 'dev',
        historyApiFallback: true,
        host: config.webpack.host || 'localhost',
        port: config.webpack.port || 8080,
        inline: true
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'styles.css'
        }),
        new HTMLPlugin({
            title: 'Memory game',
            template: `${PATHS.SRC}/index.ejs`
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [autoprefixer({
                    browsers: [
                        'last 2 Chrome versions',
                        'last 2 Firefox versions',
                        'last 2 edge versions',
                        'IE >= 9',
                        'Safari >= 7',
                        'iOS >= 7'
                    ]
                })]
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: 'commons.js',
            minChunks: Infinity
        }),
    ]
};

if (BABEL_ENV === 'dev') {
    const devServerUrl = config.webpack.devServerUrl || 'http://localhost:8080';
    exports.entry.commons.unshift(`webpack-dev-server/client?${devServerUrl}`);
    exports.entry.commons.unshift('webpack/hot/only-dev-server');
    exports.plugins.unshift(new webpack.HotModuleReplacementPlugin());
}

export default exports;