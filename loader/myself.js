module.exports = function hello (source) {
	var callback = this.async()
	let out = source.replace('a', 'alert')
	out = out.replace('c', 'console.log')
	console.log(out)
	callback(null, out)
}