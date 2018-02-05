let webpack = require('webpack'),
    path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    inProd = process.env.NODE_ENV === 'production'
module.exports = [
//     {
//     name: 'styles',
//     entry: {
//         main: ['./src/assets/styles/normalize.scss', './src/assets/styles/main.scss']
//     },
//     output: {
//         path: path.resolve(__dirname, './dist/css'),
//         filename: '[name].css'
//     },
//     module: {
//         rules: [{
//             test: /\.(scss|sass)$/,
//             use: ExtractTextPlugin.extract({
//                 use: ['css-loader', 'sass-loader'],
//                 fallback: 'style-loader'
//             })
//         }]
//     },
//     plugins: [
//         new ExtractTextPlugin('[name].css')
//     ]
// },
 {
    name: 'scripts',
    entry: {
        main: ['./src/assets/js/main.js']
    },
    output: {
        path: path.resolve(__dirname, './dist/js'),
        filename: '[name].js'
    },
    module: {

        rules: [
            {
                test: /\.(scss|sass)$/,
                use: ['style-loader','css-loader','sass-loader']
            },
            {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                    // the "scss" and "sass" values for the lang attribute to the right configs here.
                    // other preprocessors should work out of the box, no loader config like this necessary.
                    'scss': 'vue-style-loader!css-loader!sass-loader',
                    'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                }
                // other vue-loader options go here
            }
        }, {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        }]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    externals: {
        "vue": "Vue" 
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map',
    plugins: [
        new ExtractTextPlugin('[name].css')
    ]
}]
if (inProd) {
    module.exports.forEach(c => c.plugins.push(
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        })
    ))
}