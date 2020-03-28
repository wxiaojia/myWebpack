module.exports = function hello (source) {
	// console.log(this)	// 这个this包含很多东西
	let callback = this.async()
	let reg = /console\.log\(.+?\)/g
	let out = source.replace(reg, '')
	callback(null, out)
}