var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        path.join(__dirname, '/src/index.js')
    ],
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: 'build',
        filename: 'app.js'
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
            },
            { test: /\.css$/, loader: 'style-loader!css-loader' }
        ]
    },
    devServer: {
        contentBase: __dirname
    },
    devtool: 'source-map'
};