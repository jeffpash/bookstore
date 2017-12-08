const path = require('path');

module.exports = {

    entry: path.resolve(__dirname, 'client') + '/app/index.js',
    output: {
        path: path.resolve(__dirname,'dist') +'/app',
        filename: 'bundle.js',
        publicPath: '/app/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'client'),
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    }
};
