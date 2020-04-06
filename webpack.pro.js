const webpack= require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	optimization: {
		minimize: false
	},
	plugins: [
		new htmlWebpackPlugin({
			filename: 'index.html',
			template: './index.html',
			minify: {
				collapseWhitespace: true
			},
			inject: true
		})
	]
}

