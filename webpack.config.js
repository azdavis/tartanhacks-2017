const path = require("path")

module.exports = {
    entry: "./src/views/home.js",
    output: {
        path: __dirname,
        filename: "./src/views/home.min.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            }
        ]
    }
}
