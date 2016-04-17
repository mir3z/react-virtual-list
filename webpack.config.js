var path = require("path");
var webpack = require('webpack');

module.exports = {
    entry: [
        path.join(__dirname, 'src', 'VirtualList.js')
    ],
    output: {
        path: path.join(__dirname, 'build'),
        libraryTarget: 'umd',
        library: 'VirtualList',
        filename: 'react-virtual-list.js'
    },
    externals: {
        react: {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react',
            root: 'React'
        },
        'react-dom': {
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'react-dom',
            root: 'ReactDOM'
        }
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ],
    devtool: 'source-map'
};