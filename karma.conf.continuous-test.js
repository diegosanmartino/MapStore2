module.exports = function karmaConfig(config) {
    config.set({

        browsers: [ 'Chrome' ],

        singleRun: false,

        frameworks: [ 'mocha' ],

        files: [
            'tests.webpack.js',
            { pattern: './web/client/test-resources/**/*', included: false }
        ],

        preprocessors: {
            'tests.webpack.js': [ 'webpack', 'sourcemap' ]
        },

        reporters: [ 'mocha', 'coverage', 'coveralls' ],

        junitReporter: {
            outputDir: './web/target/karma-tests-results',
            suite: ''
        },

        coverageReporter: {
            dir: './coverage/',
            reporters: [
                { type: 'html', subdir: 'report-html' },
                { type: 'cobertura', subdir: '.', file: 'cobertura.txt' },
                { type: 'lcovonly', subdir: '.' }
            ],
            instrumenterOptions: {
                istanbul: { noCompact: true }
            }
        },

        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [
                    { test: /\.jsx?$/, exclude: /ol\.js$/, loader: 'babel-loader' },
                    { test: /\.css$/, loader: 'style!css'},
                    { test: /\.(png|jpg|gif)$/, loader: 'url-loader?name=[path][name].[ext]&limit=8192'} // inline base64 URLs for <=8k images, direct URLs for the rest
                ],
                postLoaders: [ ]
            },
            resolve: {
                extensions: ['', '.js', '.json', '.jsx']
            }
        },

        webpackServer: {
            noInfo: true
        }

    });
};
