const { app, Menu, Tray } = require('electron');
const {show: showMainWindow} = require('../windows/main')
const {create: createAboutWindow} = require('../windows/about')
const path = require('path');

let tray;
function setTray() {
  tray = new Tray(path.resolve(__dirname, './icon_darwin.png'));
  tray.on('click', () => {
    showMainWindow()
  });
  tray.on('right-click', () => {
    const contextMenu = Menu.buildFromTemplate([
      { label: '显示', click: showMainWindow },
      { label: '退出', click: app.quit },
    ]);
    tray.popUpContextMenu(contextMenu)
  });
}

function setAppMenu() {
  let appMenu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          label: '关于',
          click: createAboutWindow,
        },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    },
    { role: 'fileMenu' }, // 文件快捷键：cmd+w
    { role: 'windowMenu' }, // 窗口快捷键
    { role: 'editMenu' }, // 编辑快捷键
  ]);
  app.applicationMenu = appMenu;
}

app.whenReady().then(() => {
  setTray();
  setAppMenu();
});
