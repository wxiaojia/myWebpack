const path = require('path')	// node的方法
const staticChange = require('./plugin/staticChange')

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
	entry: {
		app: path.resolve(__dirname, './main.js'),
		app2: path.resolve(__dirname,'./page2.js')
	},			// 入口文件
	mode: 'development',
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
			test: /.css$/,	 
			use: [{
				loader: 'style-loader'	// loader从后往前去运行的
			}, {
				loader: 'css-loader'
			}]
		}]
	},
	plugins: [
		new staticChange() 
	]
} 