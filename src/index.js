'use strict';
import {app, BrowserWindow} from 'electron';
import devtools from './devtools';
import settings from 'electron-settings';

if ('development' === process.env.NODE_ENV) {
    devtools();
}
app.on('before-quit', () => {
    console.log('Saliendo...');
});
app.on('ready', () => {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        title: "Hola Mundo",
        center: true,
        show: false,
    });
    settings.set('DB', {
        user: 'postgres',
        host: 'localhost',
        database: 'avena',
        password: 'root',
        port: 5432,
    });
    win.once('ready-to-show', () => {
        win.show();
    });
    win.on('closed', () => {
        win = null;
        app.quit()
    });
    win.loadURL(`file://${__dirname}/renderer/index.html`);
});
