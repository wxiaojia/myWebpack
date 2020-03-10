const path = require('path')	// node的方法

module.exports = {
	entry: './main.js',			// 入口文件
	mode: 'development',
	output: {					
		filename: 'bundle.js',
		path: path.resolve(__dirname, "output")
	},
	module: {
		rules: [{
			test: /.hello$/,			// 需要加载的文件，正则匹配
			loader: [path.resolve(__dirname, './loader/myloader.js'),]		// 自己写的loader文件
		}, {
			test: /.js$/,			// 需要加载的文件，正则匹配
			loader: [path.resolve(__dirname, './loader/removeConsole.js'),]		// 自己写的loader文件
		}, {
			test: /.xj$/,			// 需要加载的文件，正则匹配
			loader: [path.resolve(__dirname, './loader/myself.js'),]		// 自己写的loader文件
		}]
	}
}