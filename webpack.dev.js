// 开发模式装用
const webpack = require('webpack')

module.exports = {
	devtool: 'cheap-module-source-map',
	devServer: {
        port: 9001,          // 代理接口
        overlay: true,      // 错误遮罩    
        hot: true,            // 热更新
        hotOnly: true,
        historyApiFallback: {
         	rewrites: [{
           		from: /^\/([ -~]+)/,		//　以斜杠开头，后面是任意的字符串
           		to: function (content) {	// content就是上面正则匹配到的内容
//         			return './' + content.match[1] + './html'			//  匹配到的，如果输入'/a'那content.match[1]就是a,如果输入的是'/b'那就是b,谈后去匹配当前目录下的html
           			return './404.html'			// 作业：一个具有404页面的webpack-dev-server 。
           		}
           	}]
        },
//      proxy: {
//      	'/': {								// 碰到以/开头的地址就进行这个代理转发
//      		target: '123.123.123.123',		// 转发的地址
//      		changeOrigin: true,				
//      		pathRewrite: {					// 可以对接口进行简化，在是用中只需要添加写'/comments'
//      			'^/comments': '/api/comments'
//      		},
//      		headers: {}						// 代理的请求上面加请求头
//      	}
//      }
    },
	// 其他常用配置：
	//inline 服务的开启模式(默认true,若为false 时在页面顶部有一个状态条，显示当前状态是编译还是准备状态)
	//lazy 懒编译（开启多入口时，如果没有lazy就会所有的编译，开启了lazy只有当我们访问的时候才会对入口进行编译，提高打包和编译的速度）
	//historyApiFallback: 路径重定向（当我们输入的路径是没有配置的，那么通过这个可以将找不到的路径配置到指定的页面，一般来404，如果为true,输入没有定义的路径，则会保留在原来的页面
	//proxy: 代理请求
	plugins: [ 
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin()
	]
}
