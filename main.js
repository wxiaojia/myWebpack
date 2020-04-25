// 尝试 显示文件中的内容
import data from './test.hello'
import test from './test.ts'
// 引入图片
import img1 from './static/img/img.jpg'
var img = new Image()
img.src = img1;
document.getElementById('mydiv').appendChild(img)

// 异步提取第一种：
// import test_memory from './test-memory.js'
// 使用异步加载的方法引入test_memory
// import ("./test_memory.js")			// 打包后会产生一个3.bundle.js，相对的，如果里面有css，也会将css也拆出来
// 命名：在里面注释的方法，拆出来后可以进行下一步操作，import方法出来后返回的是promise，可以用then来定义下一步操作
import (/*webpackChunkName: 'testMemory'*/"./test_memory.js").then((res) => {
//	res即为里面的内容
})

//  异步提取第二种方法:
// 下方数组里是在下面函数中需要用到的模块,function中接收，数组中有多少个元素就接收多少个参数
require.ensure(['jquery'], function($){
	require("./test_memory.js")
})
 
function test1 () {
	let element = document.getElementById('app')
	console.log(data)
	element.innerHTML = data
}

test1()

// 取出console.log()
var a = 123
var c = 2333
console.log(a)
console.log(6)
alert(9)
function  test2 () { 
	let element = document.getElementById('app')
		element.innerHTML = element.innerHTML + ' ' + c
}
 
test2()


