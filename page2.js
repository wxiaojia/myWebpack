import test from './test.less'
import test2 from './test2.less'

// 自定义的语法
function  test3 () {
	let element = document.getElementById('app')
		element.innerHTML = element.innerHTML + '  自定义语法'
		document.getElementById('mydiv').setAttribute('class', test.div1)
}
 
test3() 