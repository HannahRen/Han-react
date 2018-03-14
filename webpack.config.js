var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

// var nodeModulesPath = path.resolve(__dirname, 'node_modules')
// console.log(process.env.NODE_ENV)

module.exports = {
    entry: path.resolve(__dirname, 'app/index.jsx'),
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },

    resolve:{
        extensions:['', '.js','.jsx']
    },

    module: {
        // preLoaders: [
        //     {test: /\.(js|jsx)$/, loader: "eslint-loader", exclude: /node_modules/}
        // ],
        loaders: [
            { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel' },
            { test: /\.less$/, exclude: /node_modules/, loader: 'style!css!postcss!less' },
            { test: /\.css$/, exclude: /node_modules/, loader: 'style!css!postcss' },
            { test:/\.(png|gif|jpg|jpeg|bmp)$/i, loader:'url-loader?limit=5000' },  // the size limit to 5k
            { test:/\.(png|woff|woff2|svg|ttf|eot)($|\?)/i, loader:'url-loader?limit=5000'} //
        ]
    },

    eslint: {
        configFile: '.eslintrc' // Rules for eslint
    },

    postcss: [
        require('autoprefixer') //autoprefixer plugins
    ],

    plugins: [
        // insert bundle.js into HTML
        new HtmlWebpackPlugin({
            template: __dirname + '/app/index.tmpl.html'
        }),

        // Hot reloading
        new webpack.HotModuleReplacementPlugin(),

        // open browser, and run at localhost:8080
        new OpenBrowserPlugin({
          url: 'http://localhost:8080'
        }),

        // when developing, using __DEV_ to make sure whether under development or not.
        new webpack.DefinePlugin({
          __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
        })
    ],

    devServer: {
        proxy: {
          '/api': {
            target: 'http://localhost:3000',
            secure: false
          }
        },
        contentBase: "./public",
        colors: true,
        historyApiFallback: true,
        inline: true,
        hot: true
    }
}
