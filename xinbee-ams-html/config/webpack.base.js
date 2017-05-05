const webpack = require('webpack');
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractCss = new ExtractTextPlugin({
    filename: "css/[contenthash].css"
});

module.exports = function () {
    return {
        
        entry: ['babel-polyfill', './app/app.js'],

        output: {
            path: path.join(__dirname, "../dist"),
            filename: "js/[chunkhash].js",
            chunkFilename: 'js/[name].[chunkhash:5].chunk.js',
            libraryTarget: "umd"
        },

        module: {
            rules: [{
                test: /\.js$/, use: "babel-loader", exclude: /node_modules/
            },
            {
                test: /\.css$/, use: ExtractCss.extract(["css-loader"])
            }, 
            {
                test: /\.gif|\.png|\.jpg(\?.+)?$/,
                use: "url-loader?limit=8192&name=img/[hash].[ext]"
            }, 
            {
                test: /\.woff|\.woff2|\.ttf|\.otf|\.eot|\.svg(\?v=.+)?$/,
                use: 'url-loader?limit=8192&name=img/[hash].[ext]'
            }]
        }, plugins: [
            new HtmlPlugin({
                filename: 'index.html', template: 'public/index.html'
            }),ExtractCss]
    };
}
