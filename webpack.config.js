const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
    mode: "production",
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        open: true
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "public", to: "." },
            ],
        }),
    ],
};