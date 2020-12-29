const Store = require('electron-store')

const store = new Store()

module.exports = store

store.set('Author', 'Hexagram')
console.log(store.get('Author'))
