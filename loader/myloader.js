module.exports = function hello (source) {
	let callback = this.async()
	callback(null, `export default ${JSON.stringify(source)} `)
}