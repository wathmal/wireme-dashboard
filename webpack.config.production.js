var path = require('path');
var srcPath = path.join(__dirname, 'src');
var buildPath = path.join(__dirname, 'build', 'public');
var webpack = require('webpack');

module.exports = {
    context: srcPath,
    entry: path.join(srcPath, 'client', 'client.js'),
    devtool: false,
    output: {
        path: buildPath,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015','stage-0']
                }
            },
            {
                test: /(\.scss|\.css)$/,
                loaders: ["style", "css?modules", "sass"]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true
            },
            minimize: true
        })
    ]
};