const path = require('path');

module.exports = {
    // ... other webpack config options ...

    entry: './frontend/src/index.js', // Path to your entry point file
    output: {
        filename: 'bundle.js', // Name of the output bundle file
        path: path.resolve(__dirname, 'frontend/dist'), // Path to the output directory
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Apply the following rules to .js files
                exclude: /node_modules/, // Exclude the node_modules directory
                use: {
                    loader: 'babel-loader', // Use Babel for transpiling JavaScript
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js'], // File extensions to automatically resolve
    },
    resolve: {
        fallback: {
            buffer: require.resolve('buffer/'),
            crypto: require.resolve('crypto-browserify'),
            stream: require.resolve('stream-browserify'),
            util: require.resolve('util/'),
        },
    },

    // ... rest of your webpack config ...
};