module.exports = function hello (source) {
	let reg = /console\.log\(.+?\)/g
	let out = source.replace(reg, '')
	console.log(out)
	return out
}