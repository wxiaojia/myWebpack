// 尝试 显示文件中的内容
import data from './test.hello'
import myself from './myself.xj'

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

// 自定义的语法
function  test3 () {
	let element = document.getElementById('app')
		element.innerHTML = element.innerHTML + '  自定义语法'
}
 
test3()