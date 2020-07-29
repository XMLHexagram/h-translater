const Store = require('electron-store')

const store = new Store()

store.set('Author', 'Hexagram')
console.log(store.get('Author'))
