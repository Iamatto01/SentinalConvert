const { contextBridge, ipcRenderer } = require('electron');

// ── Expose safe APIs to the renderer process ──
contextBridge.exposeInMainWorld('electronAPI', {
  // Get app version
  getVersion: () => '2.0.0',

  // Check if running in Electron
  isElectron: true,

  // Platform info
  platform: process.platform,

  // Listen for files opened via File > Open menu or drag-drop onto app icon
  onFilesOpened: (callback) => {
    ipcRenderer.on('files-opened', (_event, filePaths) => callback(filePaths));
  },

  // Open a URL in the system default browser
  openExternal: (url) => {
    ipcRenderer.send('open-external', url);
  }
});