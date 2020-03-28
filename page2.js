import './test.css'
import './test2.css'
console.log(123)

// 自定义的语法
function  test3 () {
	let element = document.getElementById('app')
		element.innerHTML = element.innerHTML + '  自定义语法'
}
 
test3()