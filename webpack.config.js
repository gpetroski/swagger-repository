const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        client: './src/client/js/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'js/[name].bundle.js',
        chunkFilename: 'js/[name].bundle.js',
        publicPath: '/'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    enforce: true
                }
            }
        }
    },
    module: {
        rules:[
            {
                test:/\.css$/,
                use:[MiniCssExtractPlugin.loader,'css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "images/[name].[ext]"
                    }
                }
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "css/[name].css"
        })
    ]
    // entry: {
    //     index: './src/client/index.js'
    // },
    // output: {
    //     filename: '[name].js',
    //     path: path.resolve(__dirname, 'dist/js')
    // },
    // module: {
    //     rules:[
    //         {
    //             test:/\.css$/,
    //             use:['style-loader','css-loader']
    //         }
    //     ]
    // }
};


// optimization: {
//     splitChunks: {
//         chunks: 'async',
//             minSize: 30000,
//             minChunks: 1,
//             maxAsyncRequests: 5,
//             maxInitialRequests: 3,
//             automaticNameDelimiter: '~',
//             name: true,
//             cacheGroups: {
//             vendors: {
//                 test: /[\\/]node_modules[\\/]/,
//                     priority: -10
//             },
//         default: {
//                 minChunks: 2,
//                     priority: -20,
//                     reuseExistingChunk: true
//             }
//         }
//     }
// }