'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win = null
let subWin = null

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

function createSubWin() {
  subWin = new BrowserWindow({
    width: 180,
    height: 400,
    minWidth: 180,
    maxWidth: 180,
    // minHeight: 100,
    // maxHeight: 100,
    // resizable: false,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    show: false,
    webPreferences: {
      // nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
      nodeIntegration: true
    }
  })

  subWin.on('closed', () => {
    subWin = null
  })

  subWin.once('ready-to-show', () => {
    subWin.show()
  })
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    subWin.loadURL(process.env.WEBPACK_DEV_SERVER_URL + 'sub')
    if (!process.env.IS_TEST) subWin.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    subWin.loadURL('app://./sub.html')
  }
}

function createWindow() {
  // console.log(process.env.ELECTRON_NODE_INTEGRATION)
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: (800 / 5) * 4,
    minWidth: 700,
    minHeight: (700 / 5) * 4,
    maxWidth: 900,
    maxHeight: (900 / 5) * 4,
    fullscreenable: false,
    // frame: false,
    show: false,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      // nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      enableRemoteModule: true,
      nodeIntegration: true
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL + 'index')
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })

  win.once('ready-to-show', () => {
    win.show()
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
  // createSubWin()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

ipcMain.on('create-sub-win', () => {
  if (subWin === null) {
    createSubWin()
  }
})

ipcMain.on('change-sub-height', (event, arg) => {
  // console.log(arg)
  let subWinSize = subWin.getSize()
  subWin.setSize(subWinSize[0], arg)
  // console.log(subWin.getSize())
})
