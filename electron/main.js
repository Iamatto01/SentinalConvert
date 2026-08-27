const { app, BrowserWindow, Menu, dialog, shell, ipcMain, session } = require('electron');
const path = require('path');

// ── Security: enable SharedArrayBuffer for ffmpeg.wasm ──
app.commandLine.appendSwitch('enable-features', 'SharedArrayBuffer');

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 800,
    minHeight: 600,
    title: 'SentinelConvert',
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    },
    // ── Dark title bar ──
    backgroundColor: '#0f0f1a',
    show: false
  });

  // ── Load index.html ──
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // ── COOP/COEP headers for SharedArrayBuffer (ffmpeg.wasm) ──
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Cross-Origin-Opener-Policy": ["same-origin"],
        "Cross-Origin-Embedder-Policy": ["require-corp"]
      }
    });
  });

  // ── Show when ready (no white flash) ──
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // ── Open external links in system browser ──
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http')) {
      shell.openExternal(url);
    }
    return { action: 'deny' };
  });

  // ── Menu bar ──
  const menuTemplate = [
    {
      label: 'File',
      submenu: [
        { label: 'Open File…', accelerator: 'CmdOrCtrl+O', click: () => openFileDialog() },
        { type: 'separator' },
        { role: 'quit' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectAll' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About SentinelConvert',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'About SentinelConvert',
              message: 'SentinelConvert v2.0',
              detail: 'Free Student Toolkit — 31 tools for PDF, images, media, documents, and more.\n\nAll processing happens locally on your computer. No files are ever uploaded.'
            });
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  mainWindow.on('closed', () => { mainWindow = null; });
}

function openFileDialog() {
  dialog.showOpenDialog(mainWindow, {
    properties: ['openFile', 'multiSelections'],
    filters: [
      { name: 'All Supported', extensions: ['pdf', 'png', 'jpg', 'jpeg', 'webp', 'svg', 'gif', 'bmp', 'csv', 'json', 'xlsx', 'xls', 'docx', 'pptx', 'mp4', 'webm', 'mp3', 'wav', 'ogg', 'mov', 'avi', 'mkv'] },
      { name: 'PDF Documents', extensions: ['pdf'] },
      { name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'webp', 'svg', 'gif', 'bmp'] },
      { name: 'Documents', extensions: ['docx', 'pptx', 'xlsx', 'xls', 'csv', 'json'] },
      { name: 'Media', extensions: ['mp4', 'webm', 'mp3', 'wav', 'ogg', 'mov', 'avi', 'mkv'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  }).then(result => {
    if (!result.canceled && result.filePaths.length > 0) {
      mainWindow.webContents.send('files-opened', result.filePaths);
    }
  });
}

// ── App lifecycle ──
app.whenReady().then(createWindow);

// ── IPC: open external URLs ──
ipcMain.on('open-external', (_event, url) => {
  if (url && url.startsWith('http')) {
    shell.openExternal(url);
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});