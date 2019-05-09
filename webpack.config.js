const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		path: __dirname + '/dist/assets',
		filename: 'bundle.js',
		sourceMapFilename: 'bundle.map'
	},
	devtool: '#source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
				query: {
					presets: ['env', 'stage-0', 'react']
				}
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader', {
					loader: 'postcss-loader',
					options: {
						plugins: () => [require('autoprefixer')]
					}
				}]
			}
		]
	},
	optimization: {
	    minimizer: [
			new UglifyJsPlugin({
					cache: true,
					parallel: true,
					uglifyOptions: {
						compress: false,
						ecma: 6,
						mangle: true
					},
				sourceMap: true
			})
	    ]
	}
}
