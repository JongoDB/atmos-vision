const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Platform information
  platform: process.platform,

  // App version
  getVersion: () => process.env.npm_package_version || '0.1.0',

  // Example IPC methods (can be extended as needed)
  // Uncomment and implement when needed:

  // sendMessage: (channel, data) => {
  //   const validChannels = ['toMain'];
  //   if (validChannels.includes(channel)) {
  //     ipcRenderer.send(channel, data);
  //   }
  // },

  // receiveMessage: (channel, func) => {
  //   const validChannels = ['fromMain'];
  //   if (validChannels.includes(channel)) {
  //     ipcRenderer.on(channel, (event, ...args) => func(...args));
  //   }
  // },

  // File system operations (if needed):
  // selectFile: () => ipcRenderer.invoke('dialog:openFile'),
  // saveFile: (data) => ipcRenderer.invoke('dialog:saveFile', data),
});

// Log that preload script has been loaded
console.log('AtmosVision Pro: Preload script loaded successfully');
