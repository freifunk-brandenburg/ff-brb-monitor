const {app, Tray, Menu, BrowserWindow} = require('electron');
const path = require('path');

const iconPath = path.join(__dirname, 'icon-small.png');

let appIcon = null;
let win = null;

app.on('ready', function(){
  win = new BrowserWindow({show: false});
  win.loadURL('file://' + __dirname + '/window.html');
  appIcon = new Tray(iconPath);

  var contextMenu = Menu.buildFromTemplate([
    /*{
      label: 'Toggle DevTools',
      accelerator: 'Alt+Command+I',
      click: function() {
        win.show();
        win.toggleDevTools();
      }
    },*/
    { label: 'Quit',
      accelerator: 'Command+Q',
      selector: 'terminate:',
    }
  ]);
  appIcon.setToolTip('Freifunk alert');
  appIcon.setContextMenu(contextMenu);
});
