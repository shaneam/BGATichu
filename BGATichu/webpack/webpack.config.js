const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: "production",
	devtool: 'inline-source-map',
	entry: {
		log_extractor: path.resolve(__dirname, "..", "scripts", "log_extractor.ts"),
		tichu: path.resolve(__dirname, "..", "scripts", "tichu.ts"),
		popup: path.resolve(__dirname, "..", "scripts", "popup.ts"),
	},
	output: {
		path: path.join(__dirname, "../dist"),
		filename: "[name].js",
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new CopyPlugin({
			patterns: [{from: ".", to: ".", context: "public", noErrorOnMissing: true}]
		}),
	],
};
