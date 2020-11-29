const { app } = require('electron');
const path = require('path');
const handleIPC = require('./ipc');
const {
  show: showMainWindow,
  close: closeMainWindow,
  create: createMainWindow,
} = require('./windows/main');

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    showMainWindow();
  });
  app.on('ready', () => {
    createMainWindow();
    handleIPC();
    require('./taryAndMenu');
  });
  app.on('before-quit', () => {
    closeMainWindow();
  });
  app.on('activate', () => {
    showMainWindow();
  });
}
