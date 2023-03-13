const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 1080,
    height: 660,
    frame: false,
    minWidth: 1080,
    minHeight: 660,
    icon: 'image/icon.ico',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

    win.loadFile('index.html')

    ipcMain.on('minimize', () => {
        win.isMinimized()? win.restore() : win.minimize() 
    })

    ipcMain.on('maximize', () => {
        win.isMaximized()? win.restore() : win.maximize()
    })

    ipcMain.on('closeApp', () => {
        win.close()
    })



}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})



app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})