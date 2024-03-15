import { app, BrowserWindow, screen } from 'electron';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { readFile, writeFile } from 'node:fs/promises';

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

let mainWindow = null;

// const systemInfo = await getSystemInfo();
const config = JSON.parse(await readFile('./config.json', 'utf-8'));

const createMainWindow = () => {
  const display = screen.getPrimaryDisplay();
  mainWindow = new BrowserWindow({
    fullscreen: config.fullscreen ?? true,
    frame: config.frame ?? false,
    // focusable: false, // On Linux: false makes the window stop interacting with wm, so the window will always stay on top in all workspaces.
  });
  mainWindow.loadURL(config.url ?? 'https://edugolo.be');

  // Hide cursor in webpage
  mainWindow.webContents.on('dom-ready', (event) => {
    let css = '* { cursor: none !important; }';
    mainWindow.webContents.insertCSS(css);
  });
};

app.commandLine.appendSwitch('disable-gpu');

app.on('ready', async () => {
  createMainWindow();
  console.log('App ready');
});
