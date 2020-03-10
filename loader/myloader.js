module.exports = function hello (source) {
	console.log(source)
	return `export default ${JSON.stringify(source)} `
}