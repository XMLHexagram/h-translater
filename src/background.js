"use strict";
/* global __static */

import { app, protocol, BrowserWindow, ipcMain, screen, webContents, Tray, Menu, MenuItem } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";

const path = require("path");

// new Tray()

const Store = require("electron-store");
const store = new Store();

const isDevelopment = process.env.NODE_ENV !== "production";

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win = null;
let subWin = null;
let tray = null;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);

function createSubWin() {
  let screenSize = screen.getPrimaryDisplay().workAreaSize;

  subWin = new BrowserWindow({
    width: Math.floor(screenSize.width * 0.15),
    height: Math.floor((screenSize.width * 0.15 * 4) / 5),
    // minWidth: 180,
    // maxWidth: 180,
    resizable: false,
    x: Math.floor(screenSize.width * 0.88),
    y: Math.floor(screenSize.height * 0.07),
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
  });

  subWin.on("closed", () => {
    subWin = null;
  });

  // subWin.once('ready-to-show', () => {
  //   subWin.show()
  // })
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    subWin.loadURL(process.env.WEBPACK_DEV_SERVER_URL + "sub");
    if (!process.env.IS_TEST) subWin.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    subWin.loadURL("app://./sub.html");
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
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL + "index");
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }

  win.on("closed", () => {
    win = null;
  });

  win.once("ready-to-show", () => {
    win.show();
    createSubWin();
  });
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// app.whenReady().then(() => {
//   console.log(1)
//   tray = new Tray('./aa.png')
//   // const contextMenu = Menu.buildFromTemplate([
//   //   { label: 'Item1', type: 'radio' },
//   //   { label: 'Item2', type: 'radio' },
//   //   { label: 'Item3', type: 'radio', checked: true },
//   //   { label: 'Item4', type: 'radio' }
//   // ])
//   // console.log(11111)
//   // tray.setToolTip('This is my application.')
//   // console.log(1242135)
//   // tray.setContextMenu(contextMenu)
// })

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }

  tray = new Tray(path.join(__static, "icon.png"));
  const contextMenu = Menu.buildFromTemplate([

    {
      label: "展开翻译式程", click: function() {
        if (subWin === null) {
          createSubWin();
          subWin.show();
        }
        if (subWin !== null) {
          subWin.show();
        }
      }
    },
    {
      label: "隐藏翻译式程", click: function() {
        if (subWin === null) {
          return;
        }
        if (subWin !== null) {
          subWin.hide();
        }
      }
    },
    {
      label: "所有桌面可见", type: "checkbox", click: function(item) {
        if (item.checked === true) {
          subWin.setVisibleOnAllWorkspaces(true);
          console.log(1);
        } else {
          subWin.setVisibleOnAllWorkspaces(false);
          console.log(2);
        }
        // console.log(3)
        // item.checked = false
      }
    },
    {
      label: "显示主窗口",
      click: function() {
        if (win === null) {
          createWindow();
        } else {
          win.show();
        }
      }
    },
    { label: "", type: "separator" },
    { label: "退出", role: "quit" }

  ]);
  tray.setContextMenu(contextMenu);

  createWindow();
  // createSubWin()
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

ipcMain.on("create-sub-win", () => {
  if (subWin === null) {
    createSubWin();
    subWin.show();
  }
  if (subWin !== null) {
    subWin.show();
  }
});

ipcMain.on("end-sub-win", () => {
  if (subWin !== null) {
    subWin.hide();
  }
});

ipcMain.on("change-sub-height", (event, arg) => {
  // console.log(arg)
  let subWinSize = subWin.getSize();
  subWin.setSize(subWinSize[0], arg);
  // console.log(subWin.getSize())
});

ipcMain.handle("get-store", (event, arg) => {
  return store.get(arg);
});

ipcMain.on("set-store", (event, arg, arg1) => {
  store.set(arg, arg1);
});

ipcMain.on("fix-sub", () => {
  subWin.setMovable(false);
});

ipcMain.on("not-fix-sub", () => {
  subWin.setMovable(true);
});

ipcMain.on("reset-sub", () => {
  // win.webContents.send('test')
  let screenSize = screen.getPrimaryDisplay().workAreaSize;
  subWin.setPosition(
    Math.floor(screenSize.width * 0.88),
    Math.floor(screenSize.height * 0.07),
    true
  );
});

ipcMain.on("change-detail-view", (event, data) => {
  store.set("trans_res", data);
  console.log(store.get("trans_res"));
  win.webContents.send("upgrade_detail");
});

ipcMain.on("sub-visible-on-all", () => {
  subWin.setVisibleOnAllWorkspaces(true);
});

ipcMain.on("not-sub-visible-on-all", () => {
  subWin.setVisibleOnAllWorkspaces(false);
});

ipcMain.on("on-sub-resizable", () => {
  subWin.setResizable(true);
});

ipcMain.on("off-sub-resizable", () => {
  subWin.setResizable(false);
});
