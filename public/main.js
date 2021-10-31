const { app, BrowserWindow } = require('electron')

const path = require('path')
const isDev = require('electron-is-dev')


require('@electron/remote/main').initialize()

function createWindow() {
  let backend;
  backend = path.join(process.cwd(), 'backend/main.exe')
  var execfile = require('child_process').execFile;
  execfile(
  backend,
  {
    windowsHide: true,
  },
  (err, stdout, stderr) => {
    if (err) {
    console.log(err);
    }
    if (stdout) {
    console.log(stdout);
    }
    if (stderr) {
    console.log(stderr);
    }
  }
  )

  // Create the browser window.
  const win = new BrowserWindow({
    width: 1225,
    height: 835,
    minWidth: 1225,
    minHeight: 835,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
    icon: __dirname + "/logo.png",
  })

  win.setMenu(null);

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    const { exec } = require('child_process');
    exec('taskkill /f /t /im main.exe', (err, stdout, stderr) => {
      if (err) {
        console.log(err)
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

