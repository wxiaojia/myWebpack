// 开发环境与生产环境的共同配置
const path = require('path')	// node的方法
const extractTextCss = require('extract-text-webpack-plugin');
const dev = require('./webpack.dev.js');
const pro = require('./webpack.pro.js');
const merge = require('webpack-merge');		// 合并工具
const webpackSpriteSmith = require('webpack-spritesmith')

module.exports = env => {
	var postPlugin = [require('autoprefixer')(),require('postcss-cssnext')()]
	postPlugin.concat(env === 'production' ? [
		require('postcss-sprites')({	// 此功能需要只在生产环境
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
//		webpack4的代码分割
		optimization: {
			spliteChunks: {
				name: true,		// 拆分出来的包是怎么命名的，根据默认的方式
				chunks: 'initial',		// initial对所有入口，所有模块都进行公共提起，对异步模块，对所有入口的公共模块进行提取 'async' 'all'
				minSize: 0,
				automaticNameDelimiter: '.',				// 原命名已~分割，现在设置以.分隔符
				cacheGroups: {								// 实现了 公共业务代码 + 第三方模块+webpack运行代码+ 页面的运行代码
					vendor:{								// 将第三方模块提取出来
						test: /[\\/]node_modules[\\/]/,
						name: 'vendor',
						priority: -10
					},
					jquery: {
						test: /jquery/,
						name: 'jquery',
						priority: -20				// 打包应该听哪个的，前面的说法是讲jquery打包到前面bundle去,优先级，-20会听取前面的，10 会将jquery提取出来
					}
				}								// 置顶将哪个文件分割出来，在3很难实现这种指定分割
			},
			runtimeChunk: {						// webpack运行代码
				name: 'runtime'
			}
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
			}, {
	            test: /\.(png|jpe?g|gif|svg)$/,
	            use: [{
	                loader: 'file-loader',
	                options: {
	                    // name: utils.assertPath('img/[name].[hash:7].[ext]')    //     图片打包出来后的命名及位置
	                    name: 'img/[name].[hash:7].[ext]',    // 设置图片命名
	                    outputPath: 'assert/img',        // 打包到打包文件的assert目录下
	                    publicPath:  'asd'            // 到时候引入的路径都会以publicPath为路径，调节打包的图片路径
	                }
	            }, {	
			   		loader: 'img-loader',
			  		options:{
				        plugins: [
				            require('imagemin-pngquant')({
				               speed: 2   // 1-11    数越大压缩成都越小，质量越好,1是最强的压缩
				            }),
				            require('imagemin-mozjpeg')({
				            	quality: 80  // 1-100 越大,质量越小,压缩体积损失越小,jpeg容易失真的,一般80左右
				            }),
				            require('imagemin-gitsicle')({
				            	optimizationLevel: 1  // 1 2 3 ,1 最小的压缩,3 rgba都进行压缩,会失真
				            })
				        ]
				    }
				}]	
			}, {
				test: /\.html$/,
				use: {
					loader: 'html-loader',
					options: {
						attrs: ['img:src']		// 对什么标签的什么属性进行解析
					}
				}
			}
		},
		plugins: [
			// 提取额外css文件
			new extractTextCss({ 
			 	filename: env === 'production' ? 'app.bundle.css': 'app.dev.css'
			}),
			new htmlWebpackPlugin({
				filename: 'index.html',
				template: './src/index.html',
				aa: 123
			}),
			new webpackSpriteSmith({
				src: {
					cwd: path.join(__dirname, 'src/asserts/img'),	// 处理什么地方的图片,在实际项目中,可将要处理成雪碧图的照片单独放在一个文件夹中
					glob: '*.jpg'									// 处理什么类型下的图片, *.jpg所有jpg图片,或者具名的 a.jpg
					
				},
				target: {			// 	输出地址
					image: path.join(__dirname, 'dist/sprites/sprite.png'),
					css: path.join(__dirname, 'dist/sprites/sprite.css')
				},
				apiOption: {		// 引用地址
					cssImageRef: './sprites/sprite.png'
				}
			}),
			// webpack3 通过代码分割,在多页面应用,分为三个模块,就要三个
//			new webpack.optimize.CommonsChunksPlugin({
//				name: 'vendor',
//				minChunks: 'infinity'
//			}),
//			new webpack.optimize.CommonsChunksPlugin({
//				name: 'mainifest',
//				minChunks: 'infinity'
//			}),
//			new webpack.optimize.CommonsChunksPlugin({
//				name: 'app',
//				minChunks: 'infinity'
//			}),
			// 多入口文件
//			new htmlWebpackPlugin({
//				filename: 'index.html',
//				template: './src/index.html',
//				chunks: ['app']					// 这个设置说明在index.html的页面中只需引入如app.js,不需要引入app2.js
//			}),
//			new htmlWebpackPlugin({
//				filename: 'index2.html',
//				template: './src/index2.html',
//				chunks: ['app2']					// 这个设置说明在index.html的页面中只需引入如app.js,不需要引入app2.js
//			})
		]
	}
	return merge(common, env == 'production' ? pro: dev)
} 