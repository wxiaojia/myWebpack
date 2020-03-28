const fs = require('fs')
const readFileAsync = require('util').promisify(fs.readFile);
const writeFileAsync = require('util').promisify(fs.writeFile);

// readFileAsync 异步读取文件方法	writeFileAsync 同步读取文件方法（node里的） ，通过util里的promisify把这两个方法变成promise，不然这是个回调的
// 过程：
// 1、监听dist目录，输出这个事件
// 2、拿到dist目录的路径，循环编译结果（可能多个文件输出的）
// 3、拿到结果名，一次读取每个目录下的文件
// 4、对其进行替换
// 5、重新写入

class staticChange {
	// apply 固定的 complier 编译过程，可以通过监听这个编译过程来做各种各样的操作。 
	apply (complier) {
		// hoops 相当与webpack整个生命周期
		// console.log(complier.hooks)
		// emit 已经编译完成了,但还没生成dist文件,（如果用这个环节，编译完还没输出，处理复杂一些） 
		// compile 每完成一个资源的编译,就会触发一次,然后把资源的编译传给你 
		// done 编译完成,也生成dist目录了（直接操作dist文件，比较简单一点，就需要对文件操作就好了）
		// 监听的是done事件，不是staticChange事件 ，staticChange是插件注册的名字
		complier.hooks.done.tap('staticChange', (complition)=>{
			// 进行的处理，ps:complition编译结果，complier是编译过程
			// complier.options可以拿到整个配置文件，也可以获取到new staticChange({option: 1})里传过来的东西
			// complier.options.context 是配置文件的根路径,然后就可以获取到dist文件,然后读取文件
			let context = complier.options.context
			// console.log(context)
			let path = context + '/output'
			// 读取编译结果，并将其封装成json,toJson自带的方法,
			// complition.toJson().assets打包结果文件信息，这里指出bundle.js，如果还有index.html等，则数组中还有index.html文件信息
			// console.log(complition.toJson().assets); 
			complition.toJson().assets.forEach((ast) => { 
				// 可定位文件，读取-修改-输出 就可以了 
				readFileAsync(path + '/' + ast.name).then((cnt) => {
					// console.log(cnt.toString().indexOf('static'))
					let cnnt = cnt.toString().replace('static', 'xxx.com/static/')
					writeFileAsync(path + '/' + ast.name, cnnt)
				})
			})
			
		})
	}
}
module.exports = staticChange;