// 开发环境与生产环境的共同配置
const path = require('path')	// node的方法
const extractTextCss = require('extract-text-webpack-plugin');
const dev = require('./webpack.dev.js');
const pro = require('./webpack.pro.js');
const merge = require('webpack-merge');		// 合并工具

module.exports = env => {
	var postPlugin = [require('autoprefixer')(),require('postcss-cssnext')()]
	postPlugin.concat(env === 'production' ? [
		require('postcss-sprites')({	// 此功能只在生产环境需要
			spritePath: 'output/sprite',
			retine: true
		})]: [])
	var common = {
		entry: {
			app: path.resolve(__dirname, './main.js'),
			app2: path.resolve(__dirname,'./page2.js')
		},			// 入口文件
	//	mode: 'development',
		output: {
			// 如果还是这种形式，会报错，Conflict: Multiple chunks emit assets to the same filename bundle.js (chunks app and app2)，因为有多个chunk，所以不能只定义一个输出文件
			// filename: 'bundle.js',
			filename:'[name].js',
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
			}, {
				test: /.tsx?$/,			// typescript的文件后缀有ts的也有tsx的，所以？ 表示1个或0个
				use: 'ts-loader'
			}, {
				test: /\.less$/,
				 use: extractTextCss.extract({
				 	fallback: {
				 		loader: 'style-loader',
				 	},
					 use: [{
					 	loader: 'css-loader',
					 	options: {
					 		modules: {
					 			localIdentName: '[path][name]_[local]_[hash:4]'	// path文件路径，name文件名，local原始类
					 		}
					 	}
					 }, {
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',	// 告诉webpack，定义的plugins是给谁使用的
							plugins: postPlugin
						}
					}]
				})
			}]
		},
		plugins: [
			// 提取额外css文件
			new extractTextCss({ 
			 	filename: env === 'production' ? 'app.bundle.css': 'app.dev.css'
			})
		]
	}
	return merge(common, env == 'production' ? pro: dev)
} 