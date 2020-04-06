// 没分环境前的
const path = require('path')	// node的方法
const staticChange = require('./plugin/staticChange')
const extractTextCss = require('extract-text-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')

const fs = require("fs");

// function getfiles () {
// 	let entry = {}
// 	let pathName = "./pages"
// 	fs.readdir(pathName, function(err, files){
// 		if (err) {
// 			reject()
// 		} else {
// 			files.forEach((file) => {
// 				let index = file.indexOf('.js')
// 				if (index > 0) {
// 					let appName = file.slice(0, index)
// 					entry[appName] = file
// 					console.log(entry)
// 				}
// 			})
// 			resolve(entry)
// 		}
// 	});
	// console.log(entry)
	// return entry
// }
// async function getEntry () {
// 	let files = await getfiles()
// 	console.log(files)
// 	return {
// 		app: path.resolve(__dirname, './pages/main.js'),
// 		app2: getEntryresolve(__dirname,'./pages/page2.js')
// 	}
// }

module.exports = {
	mode: 'development',
	entry: {
		app: path.resolve(__dirname, './main.js'),
		app2: path.resolve(__dirname,'./page2.js')
	},			// 入口文件
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
						plugins: [
							require('autoprefixer')(),
							require('postcss-cssnext')()
						]
					}
				}]
			})
		}]
	},
	plugins: [
//		new staticChange(),
		 new extractTextCss({ 
		 	filename: '[name].min.css'
		 }),
		 new htmlWebpackPlugin({
		 	filename: 'index.html',
		 	template: './index.html',
		 	minify: {
		 		collapseWhitespace: true		// 压缩
		 	},
//		 	inject: false					// 控制是否把资源自动引入，false不自动，要手动引入
			chunks: ['app']						// 若有两个入口文件，不使用chunks指定，那么就会自动引用两个
		 })
	]
} 