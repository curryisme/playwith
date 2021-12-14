const env = process.env.NODE_ENV;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    outputDir: "dist", //build输出目录
    assetsDir: "assets", //静态资源目录（js, css, img）
    lintOnSave: true, //是否开启eslint
    publicPath: "./", // 构建好的文件输出到哪里
    productionSourceMap: false,

    configureWebpack: (config) => {
        if (env !== 'development') {
            config.plugins.push(
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            drop_debugger: true, // console
                            drop_console: true,
                            pure_funcs: ['console.log'] // 移除console
                        },
                        warnings: false
                    },
                    sourceMap: false,
                    parallel: true,
                }),
            );
        }
    },
    css: {
        loaderOptions: {
            css: {
                // 这里的选项会传递给 css-loader
                importLoaders: 1,
            },
            less: {
                // 这里的选项会传递给 postcss-loader
                importLoaders: 1,
            },

        }
    },
    devServer: {
        overlay: false,
        proxy: {
            '/napi': {
                target: 'http://localhost:3001',
                changeOrigin: true,
                pathRewrite: {
                    "^/napi": ""
                }
            }
        }
    },
    pages: {
        index: {
            entry: "src/main.js",
            filename: "index.html",
            template: "public/index.html",
        }
    },
};
