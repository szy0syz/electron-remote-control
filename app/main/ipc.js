const { ipcMain } = require('electron');
const { send: sendMainWindow } = require('./windows/main')

module.exports = function () {
  ipcMain.handle('login', async () => {
    // mock
    const code = Math.floor(Math.random() * (999999 - 10000)) + 100000;
    return code;
  });

  ipcMain.handle('control', async(e, remoteCode)  => {
    // 与服务端交
    sendMainWindow('control-state-change', remoteCode ,1);
  })
};
