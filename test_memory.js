// 占用内存测试
function getme () {
	var men = process.memoryUsage()
	var format = function (bytes) {
		return (bytes/1024/1024).toFixed(2) + 'MB'
	}
	console.log('heapTotal: ' + format(men.heapTotal) + '  heapUsed: ' + format(men.heapUsed))
}

var a = []
var size = 1024 * 1024 * 20

function b () {
	var arr1 = new Array(size)
	var arr2 = new Array(size)
	var arr3 = new Array(size)
	var arr4 = new Array(size)
	var arr5 = new Array(size)
	var arr6 = new Array(size)
}

b()
getme()
setTimeout((res) => {
	a.push(new Array(20 * 1024 * 1024))
	getme()
}, 1000)