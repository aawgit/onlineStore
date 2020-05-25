const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = () => {
	return {
		entry: './server/server.js',
		target: 'node',
		mode: 'production',
		devtool: 'source-map',
		externals: [nodeExternals()],
		output: {
			path: path.join(__dirname, 'dist'),
			publicPath: '/',
			filename: 'server.js',
		},
		node: {
			__dirname: false,
			__filename: false,
		},
		optimization: {
			splitChunks: {
				chunks: 'all',
			},
			minimize: true,
			minimizer: [
				new TerserPlugin({
					parallel: true,
					cache: true,
					sourceMap: true,
				}),
			],
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					include: path.resolve(__dirname, 'server'),
					use: {
						loader: 'babel-loader',
						options: {
							cacheDirectory: true,
							presets: ['@babel/preset-env'],
							plugins: ['@babel/plugin-transform-runtime'],
						},
					},
				},
			],
		},
	};
};
