const path              = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports          = {
    entry    : './src/index.js',
    output   : {
        filename: "bundle.js",
        path    : path.join(__dirname, 'dist')
    },
    devServer: {
        port: 4200,
    },
    plugins  : [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ]
}