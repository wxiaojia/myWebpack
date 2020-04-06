const express = require('express')		// 开启服务用的，一个node的框架
const webpackDevMid = require('webpack-dev-middleware')			// 打包后的代码传到开启的服务里 中间件
const webpackHotMid = require('webpack-hot-middleware')			// 热更新的中间件
const webpack = require('webpack')
const app = express()

// webpack打包读取配置文件
const config = require('./webpack.config.js')

// 热更新需要对入口文件进行修改
Object.keys(config.entry).forEach((function(name) {
	config.entry[name] = ['webpack-hot-middleware/client?noInfo=true&reload=true'].concat(config.entry.[name])			// 字符串拼接成数组
}))	


const complier = webpack(config)		// 交给webpack进行打包，跟直接运行webpack一样，拿到打包后的结果
app.use(webpackDevMid(complier, {}))	// 打包结果给到中间件，第二个参数为配置参数

// 使用热更新
app.use(webpackHotMid(complier, {
	overlayStyles: true			// 热更新css相关
}))

app.listen(2020)


// 这里运行的代码是node dev.js
